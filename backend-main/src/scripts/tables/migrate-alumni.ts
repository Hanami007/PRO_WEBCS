import * as path from 'path';
import { Alumni } from 'src/alumnis/entities/alumni.entity';
import { File } from 'src/files/entities/file.entity';
import { DataSource } from 'typeorm';

export async function migrateAlumni(oldDb: DataSource, newDb: DataSource) {
  console.log('Starting Alumni Migration');
  const oldAlumnis = await oldDb.query('SELECT * FROM alumni');
  const newAlumniRepo = newDb.getRepository(Alumni);

  const fileRepo = newDb.getRepository(File);

  for (const oldAlumni of oldAlumnis) {
    const newFile = fileRepo.create({
      path: path.join('files', 'alumnus', oldAlumni.image_profile),
    });

    await fileRepo.save(newFile);

    const newAlumni = newAlumniRepo.create({
      fullName: oldAlumni.name,
      cohort: oldAlumni.generation,
      workplace: oldAlumni.work_place,
      position: oldAlumni.job_title,
      quote: oldAlumni.caption,
      profileImage: newFile,
      createdAt: oldAlumni.created_at,
      updatedAt: oldAlumni.updated_at,
      deletedAt: oldAlumni.is_del ? new Date() : undefined,
    });
    await newAlumniRepo.save(newAlumni);
  }
  console.log('Alumni Migration Complete');
}
