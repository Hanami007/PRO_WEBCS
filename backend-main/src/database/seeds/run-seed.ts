import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { UserSeedService } from './user/user-seed.service';
import { PersonnelStatusSeedService } from './personnel-status/personnel-status-seed.service';
import { BuildingSeedSerivce } from './building/building-seed.service';
import { RoomTypeSeedService } from './room-type/room-type-seed.service';
import { CourseGroupSeedService } from './course-group/course-group-seed.service';
import { ProgramSeedService } from './program/program-seed.service';
import { ProgramCourseSeedService } from './program-course/program-course-seed.service';
import { StudyPlanSeedService } from './study-plan/study-plan-seed.service';
import { CourseSeedService } from './course/course-seed.service';
import { RoleSeedService } from './role/role-seed.service';
import { FeatureSeedService } from './features/feature-seed.service';
import { ContactSeedService } from './contacts/contact-seed.service';
import { AboutSeedService } from './about/about-seed.service';
import { ResourceSeedService } from './resources/resource-seed.service';
import { AnnouncementSeedService } from './announcement/announcement-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);
  await app.get(RoleSeedService).run();
  await app.get(UserSeedService).run();
  await app.get(PersonnelStatusSeedService).run();
  await app.get(BuildingSeedSerivce).run();
  await app.get(RoomTypeSeedService).run();
  await app.get(CourseGroupSeedService).run();
  await app.get(FeatureSeedService).run();
  await app.get(ContactSeedService).run();
  await app.get(AboutSeedService).run();
  await app.get(ResourceSeedService).run();
  await app.get(AnnouncementSeedService).run();

  //IMPORTANT!! Program must be seeded before Study Plan
  await app.get(CourseSeedService).run();
  await app.get(ProgramSeedService).run();
  await app.get(ProgramCourseSeedService).run();
  await app.get(StudyPlanSeedService).run();
  await app.close();
};

runSeed();
