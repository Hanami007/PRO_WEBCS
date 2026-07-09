import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '../config/database.config';
import appConfig from 'src/config/app.config';
import authConfig from '../../auth/config/auth.config';
import fileConfig from '../../files/config/file.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { UserSeedModule } from './user/user-seed.module';
import { PersonnelStatusSeedModule } from './personnel-status/personnel-status-seed.module';
import { BuildingSeedModule } from './building/building-seed.module';
import { RoomTypeSeedModule } from './room-type/room-type-seed.module';
import { CourseGroupSeedModule } from './course-group/course-group-seed.module';
import { ProgramSeedModule } from './program/program-seed.module';
import { StudyPlanSeedModule } from './study-plan/study-plan-seed.module';
import { CourseSeedModule } from './course/course-seed.module';
import { ProgramCourseSeedModule } from './program-course/program-course-seed.module';
import { CarouselSeedModule } from './carousel/carousel-seed.module';
import { RoleSeedModule } from './role/role-seed.module';
import { FeatureSeedModule } from './features/feature-seed.module';
import { ContactSeedModule } from './contacts/contact-seed.module';
import { AboutSeedModule } from './about/about-seed.module';
import { ResourceSeedModule } from './resources/resource-seed.module';
import { AnnouncementSeedModule } from './announcement/announcement-seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, authConfig, fileConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    UserSeedModule,
    PersonnelStatusSeedModule,
    BuildingSeedModule,
    RoomTypeSeedModule,
    CourseGroupSeedModule,
    ProgramSeedModule,
    StudyPlanSeedModule,
    CourseSeedModule,
    ProgramCourseSeedModule,
    CarouselSeedModule,
    RoleSeedModule,
    FeatureSeedModule,
    ContactSeedModule,
    AboutSeedModule,
    ResourceSeedModule,
    AnnouncementSeedModule,
  ],
})
export class SeedModule {}
