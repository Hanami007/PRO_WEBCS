import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonnelStatus } from 'src/personnel-status/entities/personnel-status.entity';

@Injectable()
export class PersonnelStatusSeedService {
  constructor(
    @InjectRepository(PersonnelStatus)
    private repository: Repository<PersonnelStatus>,
  ) {}

  async run() {
    const statuses = [
      'ทำงานปกติ',
      'ลาศึกษาต่อ',
      'ลาออก',
      'เกษียณอายุ',
      'ย้ายคณะ/ย้ายสาขา',
      'อาจารย์พิเศษ',
      'เสียชีวิต',
      'อื่นๆ',
    ];

    for (const name of statuses) {
      const existing = await this.repository.findOne({
        where: { name: name },
      });

      if (!existing) {
        const newStatus = this.repository.create({
          name: name,
        });
        await this.repository.save(newStatus);
        console.log(`Seeded status: ${name}`);
      } else {
        console.log(`Status already exists: ${name}`);
      }
    }
  }
}
