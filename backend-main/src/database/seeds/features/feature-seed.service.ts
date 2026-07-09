import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from 'src/features/entities/feature.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeatureSeedService {
  constructor(
    @InjectRepository(Feature)
    private repository: Repository<Feature>,
  ) {}

  async run() {
    const features = [
      {
        title: 'องค์ความรู้แห่งศาสตร์วิทยาการคอมพิวเตอร์',
        description: '',
        value: '4',
        prefix: '',
        suffix: '',
        type: 'stats',
        isActive: true,
      },
      {
        title: 'โมดูลการเรียนรู้เชิงแนวคิดและปฎิบัติจริง',
        description: '',
        value: '8',
        prefix: '',
        suffix: '',
        type: 'stats',
        isActive: true,
      },
      {
        title: 'รายวิชาที่เปิดสอนโดยเลือกเรียนตามความสนใจ',
        description: '',
        value: '60+',
        prefix: '',
        suffix: '',
        type: 'stats',
        isActive: true,
      },
      {
        title: 'นักศึกษาที่สำเร็จการศึกษาแล้วทั้งสิ้น',
        description: '',
        value: '2,000+',
        prefix: '',
        suffix: '',
        type: 'stats',
        isActive: true,
      },
      {
        title: 'นักศึกษาที่สำเร็จการศึกษาแล้วทั้งสิ้น',
        description: '',
        value: '2,000+',
        prefix: '',
        suffix: '',
        type: 'stats',
        isActive: true,
      },
      {
        title: 'Bachelor of Science',
        description:
          'Earn a rigorous, accredited degree that bridges theoretical foundations with the technical skills needed for the modern workforce.',
        value: '',
        prefix: '',
        suffix: '',
        type: 'keys',
        isActive: true,
      },
      {
        title: 'Web & Software',
        description:
          'Master full-stack development. Learn to build, deploy, and scale robust applications from front-end design to back-end architecture.',
        value: '',
        prefix: '',
        suffix: '',
        type: 'keys',
        isActive: true,
      },
      {
        title: 'AI & Data Science',
        description:
          'Unlock the power of data. Study the algorithms and neural networks driving machine learning, predictive modeling, and automation.',
        value: '',
        prefix: '',
        suffix: '',
        type: 'keys',
        isActive: true,
      },
      {
        title: 'Internet of Things',
        description:
          'Connect the physical and digital worlds. Design smart systems using embedded sensors, hardware integration, and real-time data.',
        value: '',
        prefix: '',
        suffix: '',
        type: 'keys',
        isActive: true,
      },
    ];

    for (const feature of features) {
      const existing = await this.repository.findOne({
        where: { title: feature.title },
      });

      if (!existing) {
        const newFeature = this.repository.create(feature);
        await this.repository.save(newFeature);
        console.log(`Seeded feature: ${feature.title}`);
      } else {
        console.log(`Feature already exists: ${feature.title}`);
      }
    }
  }
}
