import { Personnel } from 'src/personnel/entities/personnel.entity';
import { Project } from 'src/projects/entities/project.entity';
import { File } from 'src/files/entities/file.entity';
import { DataSource } from 'typeorm';
import * as path from 'path';

export async function migrateProject(oldDb: DataSource, newDb: DataSource) {
  console.log('Starting projects migration');
  const oldProjects = await oldDb.query('SELECT * FROM project_libraries');
  const newProjectRepo = newDb.getRepository(Project);
  const personnelRepo = newDb.getRepository(Personnel);
  const fileRepo = newDb.getRepository(File);

  const oldPersonnels = await oldDb.query('SELECT id, name_en FROM personnels');
  const newPersonnels = await personnelRepo.find();

  const oldIdToNameMap = new Map();
  oldPersonnels.forEach((person) => {
    if (person.name_en) oldIdToNameMap.set(person.id, person.name_en.trim());
  });

  const nameToNewEntityMap = new Map();
  newPersonnels.forEach((person) => {
    if (person.fullnameEn)
      nameToNewEntityMap.set(person.fullnameEn.trim(), person);
  });

  const getNewPersonnelByOldId = (oldId) => {
    if (!oldId) return null;
    const name = oldIdToNameMap.get(oldId);
    if (!name) return null;
    return nameToNewEntityMap.get(name) || null;
  };

  for (const oldProject of oldProjects) {
    const newFile = fileRepo.create({
      path: path.join('files', 'projects', oldProject.file),
    });

    await fileRepo.save(newFile);

    const newEditors = [
      oldProject.editor_1,
      oldProject.editor_2,
      oldProject.editor_3,
    ]
      .map((editor) => (editor ? editor.trim() : null))
      .filter((editor) => editor && editor.length > 0);

    const chairmanEntity = getNewPersonnelByOldId(oldProject.chairman);
    const director1Entity = getNewPersonnelByOldId(oldProject.director_1);
    const director2Entity = getNewPersonnelByOldId(oldProject.director_2);

    const newProject = newProjectRepo.create({
      code: oldProject.project_code,
      name: oldProject.name,
      year: oldProject.years,
      detail: oldProject.detail,
      editors: newEditors,
      file: newFile,
      chairman: chairmanEntity,
      director1: director1Entity,
      director2: director2Entity,
      createdAt: oldProject.created_at,
      updatedAt: oldProject.updated_at,
      deletedAt: oldProject.is_del ? new Date() : undefined,
    });
    await newProjectRepo.save(newProject);
  }
  console.log('Projects Migration Complete');
}
