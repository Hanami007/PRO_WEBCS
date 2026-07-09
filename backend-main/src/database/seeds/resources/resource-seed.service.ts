import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from 'src/resources/entities/resource.entity';

@Injectable()
export class ResourceSeedService {
  constructor(
    @InjectRepository(Resource)
    private repository: Repository<Resource>,
  ) {}

  async run() {
    const resources = [
      {
        key: 'youtube_link',
        value: 'https://www.youtube.com/@comscimaejo',
        description: 'YouTube link for Computer Science MJU channel',
      },
      {
        key: 'introduction_video_id',
        value: '88JeU0ShY60',
        description: 'YouTube video ID for introduction video',
      },
      {
        key: 'admission_link',
        value: 'https://admission.mju.ac.th',
        description: 'Admission link for MJU',
      },
      {
        key: 'facebook_link',
        value: 'https://www.facebook.com/computersciencemju',
        description: 'Do not delete, facebook page link.',
      },
      {
        key: 'line_link',
        value: 'https://line.me/R/ti/p/%40053vfccm',
        description: 'Do not delete, facebook page link.',
      },
    ];

    for (const resource of resources) {
      const existing = await this.repository.findOne({
        where: { key: resource.key },
      });

      if (!existing) {
        const newResource = this.repository.create(resource);
        await this.repository.save(newResource);
        console.log(`Seeded resource: ${resource.key}`);
      } else {
        console.log(`Resource already exists: ${resource.key}`);
      }
    }
  }
}
