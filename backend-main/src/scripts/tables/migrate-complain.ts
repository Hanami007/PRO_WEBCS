import { Complain } from 'src/complains/entities/complain.entity';
import { File } from 'src/files/entities/file.entity';
import { DataSource } from 'typeorm';
import * as path from 'path';

export async function migrateComplain(oldDb: DataSource, newDb: DataSource) {
  console.log('Starting complains migration');
  const oldComps = await oldDb.query('SELECT * FROM complains');
  const newCompRepo = newDb.getRepository(Complain);

  const fileRepo = newDb.getRepository(File);

  for (const oldComp of oldComps) {
    const newFile = fileRepo.create({
      path: path.join('files', oldComp.image),
    });

    await fileRepo.save(newFile);

    const newComp = newCompRepo.create({
      title: oldComp.title,
      detail: oldComp.detail,
      image: newFile,
      createdAt: oldComp.created_at,
      updatedAt: oldComp.updated_at,
    });
    await newCompRepo.save(newComp);
  }
}
