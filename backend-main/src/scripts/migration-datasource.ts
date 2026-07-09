import { Alumni } from 'src/alumnis/entities/alumni.entity';
import { ArticleImage } from 'src/article-images/entities/article-image.entity';
import { Article } from 'src/articles/entities/article.entity';
import { Building } from 'src/buildings/entities/building.entity';
import { Carousel } from 'src/carousels/entities/carousel.entity';
import { Complain } from 'src/complains/entities/complain.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Event } from 'src/events/entities/event.entity';
import { File } from 'src/files/entities/file.entity';
import { PersonnelProfile } from 'src/personnel-profiles/entities/personnel-profile.entity';
import { PersonnelStatus } from 'src/personnel-status/entities/personnel-status.entity';
import { Personnel } from 'src/personnel/entities/personnel.entity';
import { Project } from 'src/projects/entities/project.entity';
import { RoomType } from 'src/room-type/entities/room-type.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { DataSource } from 'typeorm';

export const oldDb = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  database: 'csmju_old',
  username: 'root',
  password: 'your_strong_password',
});

export const newDb = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'csmju',
  username: 'postgres',
  password: 'postgres',
  entities: [
    Article,
    File,
    ArticleImage,
    Personnel,
    PersonnelStatus,
    PersonnelProfile,
    Project,
    Complain,
    Room,
    Building,
    RoomType,
    Alumni,
    Course,
    Event,
    Carousel,
  ],
});
