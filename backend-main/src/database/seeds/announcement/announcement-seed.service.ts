import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Announcement,
  AnnouncementStatus,
  AnnouncementType,
} from 'src/announcements/entities/announcement.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnnouncementSeedService {
  constructor(
    @InjectRepository(Announcement)
    private repository: Repository<Announcement>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async run() {
    const adminEmail = 'admin@example.com';
    const adminUser = await this.userRepository.findOne({
      where: { email: adminEmail },
    });

    if (!adminUser) {
      console.warn(
        `Admin user (${adminEmail}) not found. Skipping announcement seeding.`,
      );
      return;
    }

    const announcements = [
      {
        title: 'New Look for CS-MJU!',
        description:
          'Take a look at our new website. We have updated our design to be more modern and user-friendly.',
        link: 'https://csmju.site',
        linkLabel: 'Explore Now',
        type: AnnouncementType.NEW_FEATURE,
        status: AnnouncementStatus.PUBLISHED,
        creator: adminUser,
        publishedAt: new Date(),
      },
      {
        title: 'Welcome to the new system',
        description:
          'Our new management system is now live. Please contact the administrator if you encounter any issues.',
        type: AnnouncementType.INFO,
        status: AnnouncementStatus.PUBLISHED,
        creator: adminUser,
        publishedAt: new Date(),
      },
    ];

    for (const data of announcements) {
      const existing = await this.repository.findOne({
        where: { title: data.title },
      });

      if (!existing) {
        const entity = this.repository.create(data);
        await this.repository.save(entity);
        console.log(`Seeded announcement: ${data.title}`);
      } else {
        console.log(`Announcement already exists: ${data.title}`);
      }
    }
  }
}
