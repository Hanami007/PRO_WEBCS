import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';
import { PersonnelModule } from './personnel/personnel.module';
import { ProjectsModule } from './projects/projects.module';
import { CarouselsModule } from './carousels/carousels.module';

import { TestimonialsModule } from './testimonials/testimonials.module';
import { FeaturesModule } from './features/features.module';
import appConfig from './config/app.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { HomeModule } from './home/home.module';
import { FilesModule } from './files/files.module';
import { SessionsModule } from './sessions/sessions.module';
import { ArticleImagesModule } from './article-images/article-images.module';
import { PersonnelStatusModule } from './personnel-status/personnel-status.module';
import { PersonnelProfilesModule } from './personnel-profiles/personnel-profiles.module';
import { BuildingsModule } from './buildings/buildings.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomTypeModule } from './room-type/room-type.module';
import { AlumnisModule } from './alumnis/alumnis.module';
import { CoursesModule } from './courses/courses.module';
import { ProgramsModule } from './programs/programs.module';
import { StudyPlansModule } from './study-plans/study-plans.module';
import { ProgramCoursesModule } from './program-courses/program-courses.module';
import { CourseGroupModule } from './course-group/course-group.module';
import { EventsModule } from './events/events.module';
import { AboutSectionsModule } from './about-sections/about-sections.module';
import { AboutContentsModule } from './about-contents/about-contents.module';
import databaseConfig from './database/config/database.config';
import authConfig from './auth/config/auth.config';
import fileConfig from './files/config/file.config';
import { ComplainsModule } from './complains/complains.module';
import { HealthModule } from './health/health.module';
import { ResourcesModule } from './resources/resources.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { MisCoursePendingModule } from './mis-course-pending/mis-course-pending.module';
import { MisEquipmentBorrowModule } from './mis-equipment-borrow/mis-equipment-borrow.module';
import { MisRepairRequestModule } from './mis-repair-request/mis-repair-request.module';
import { JwtAuthGuard } from './auth/guards/jwtauth.guard';

const TypeOrmDatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    return new DataSource(options).initialize();
  },
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, authConfig, fileConfig],
      envFilePath: ['.env'],
    }),

    TypeOrmDatabaseModule,
    UsersModule,
    AuthModule,
    ArticlesModule,
    ContactsModule,
    PersonnelModule,
    ProjectsModule,
    CarouselsModule,
    TestimonialsModule,
    FeaturesModule,
    HomeModule,
    FilesModule,
    SessionsModule,
    ArticleImagesModule,
    PersonnelStatusModule,
    PersonnelProfilesModule,
    BuildingsModule,
    RoomsModule,
    RoomTypeModule,
    AlumnisModule,
    CoursesModule,
    ProgramsModule,
    StudyPlansModule,
    ProgramCoursesModule,
    CourseGroupModule,
    EventsModule,
    AboutSectionsModule,
    AboutContentsModule,
    ComplainsModule,
    HealthModule,
    ResourcesModule,
    AnnouncementsModule,
    MisCoursePendingModule,
    MisEquipmentBorrowModule,
    MisRepairRequestModule,
  ],

  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
