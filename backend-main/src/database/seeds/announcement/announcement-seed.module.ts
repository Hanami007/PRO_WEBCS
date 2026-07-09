import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Announcement } from 'src/announcements/entities/announcement.entity';
import { User } from 'src/users/user.entity';
import { AnnouncementSeedService } from './announcement-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Announcement, User])],
  providers: [AnnouncementSeedService],
  exports: [AnnouncementSeedService],
})
export class AnnouncementSeedModule {}
