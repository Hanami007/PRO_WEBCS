// THIS SCRIPT WAS FOR IMPORTING DATA FROM THE OLD DB TO NEW DB STRUCTURES

import { oldDb, newDb } from './migration-datasource';
import { migratePersonnel } from './tables/migrate-personnel';
import { migrateAricle } from './tables/migrate-article';
import { migrateComplain } from './tables/migrate-complain';
import { migrateProject } from './tables/migrate-project';
import { migrateRoom } from './tables/migrate-room';
import { migrateAlumni } from './tables/migrate-alumni';
import { migrateCourse } from './tables/migrate-course';
import { migrateEvent } from './tables/migrate-event';
import { migrateArticleImages } from './tables/migrate-article-images';
import { migrateCarousel } from './tables/migrate-carousel';

async function migrate() {
  try {
    await oldDb.initialize();
    await newDb.initialize();
    console.log('Connections established.');

    await migrateAricle(oldDb, newDb);
    await migratePersonnel(oldDb, newDb);
    await migrateComplain(oldDb, newDb);
    await migrateProject(oldDb, newDb);
    await migrateRoom(oldDb, newDb);
    await migrateAlumni(oldDb, newDb);
    await migrateCourse(oldDb, newDb);
    await migrateEvent(oldDb, newDb);
    await migrateArticleImages(oldDb, newDb);
    await migrateCarousel(oldDb, newDb);

    console.log('All Migrations completed!');
  } catch (err) {
    console.log('Fatal Error:', err);
  } finally {
    await oldDb.destroy();
    await newDb.destroy();
  }
}

migrate();
