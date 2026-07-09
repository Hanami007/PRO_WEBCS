import { Event } from 'src/events/entities/event.entity';
import { File } from 'src/files/entities/file.entity';
import { DataSource } from 'typeorm';
import * as path from 'path';

export async function migrateEvent(oldDb: DataSource, newDb: DataSource) {
  console.log('Starting Event Migration');
  const oldEvents = await oldDb.query('SELECT * FROM activities');
  const newEventRepo = newDb.getRepository(Event);
  const fileRepo = newDb.getRepository(File);

  for (const oldEvent of oldEvents) {
    const newFile = fileRepo.create({
      path: path.join('files', 'activities', 'posters', oldEvent.poster),
    });

    await fileRepo.save(newFile);

    const newEvent = newEventRepo.create({
      title: oldEvent.name,
      description: oldEvent.detail || '',
      organizer: oldEvent.organizer,
      startsAt: oldEvent.date_start,
      endsAt: oldEvent.date_end,
      location: oldEvent.location,
      externalLink: oldEvent.link,
      isActive: oldEvent.is_show,

      poster: newFile,

      createdAt: oldEvent.created_at || new Date(),
      updatedAt: oldEvent.updated_at || undefined,
    });
    await newEventRepo.save(newEvent);
  }
  console.log('Event Migration Complete');
}
