import { Personnel } from 'src/personnel/entities/personnel.entity';
import { PersonnelStatus } from 'src/personnel-status/entities/personnel-status.entity';
import { File } from 'src/files/entities/file.entity';
import { DataSource } from 'typeorm';
import * as path from 'path';

export async function migratePersonnel(oldDb: DataSource, newDb: DataSource) {
  console.log('--- MIGRATING PERSONNEL ---');

  const personnelRepo = newDb.getRepository(Personnel);
  const statusRepo = newDb.getRepository(PersonnelStatus);
  const fileRepo = newDb.getRepository(File);

  const newStatuses = await statusRepo.find();
  const newStatusMap = new Map<string, PersonnelStatus>();
  for (const s of newStatuses) {
    newStatusMap.set(s.name.trim(), s);
  }

  const oldStatusesRaw = await oldDb.query('SELECT * FROM personnel_status');
  const oldStatusIdMap = new Map<number, string>();
  for (const os of oldStatusesRaw) {
    oldStatusIdMap.set(Number(os.id), os.status.trim());
  }

  const oldPersonnels = await oldDb.query('SELECT * FROM personnels');
  console.log(`Processing ${oldPersonnels.length} personnel records...`);

  let successCount = 0;

  for (const oldP of oldPersonnels) {
    try {
      const oldStatusId = Number(oldP.work_status);
      const statusName = oldStatusIdMap.get(oldStatusId);

      let matchedStatus: PersonnelStatus | undefined;
      if (statusName) {
        matchedStatus = newStatusMap.get(statusName);
      }

      const newFile = fileRepo.create({
        path: path.join('files', 'personnels', oldP.image_profile),
      });

      await fileRepo.save(newFile);

      const newPersonnel = personnelRepo.create({
        citizenId: oldP.citizen_id,
        prefix: oldP.name_title,
        fullnameTh: oldP.name_th,
        fullnameEn: oldP.name_en,
        academicPosition: oldP.position_academic,
        administrativePosition: oldP.position_manager,
        email: oldP.email,
        phoneNumber: oldP.tel_number,
        education: oldP.education,
        personnelType: oldP.personnel_type,
        academicType: oldP.academic_type,
        workStatus: matchedStatus,
        profileImage: newFile,
        createdAt: oldP.created_at || new Date(),
        updatedAt: oldP.updated_at || new Date(),
        deletedAt: oldP.is_del ? new Date() : undefined,
      });

      await personnelRepo.save(newPersonnel);
      successCount++;
    } catch (error) {
      console.error(`Error processing ${oldP.name_th}:`, error.message);
    }
  }
  console.log(`\nDone. Records processed: ${successCount}`);
}
