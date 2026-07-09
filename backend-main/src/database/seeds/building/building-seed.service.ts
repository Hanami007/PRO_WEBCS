import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from 'src/buildings/entities/building.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BuildingSeedSerivce {
  constructor(
    @InjectRepository(Building)
    private repository: Repository<Building>,
  ) {}

  async run() {
    const buildings = [
      'ตึก 60 ปี คณะวิทยาศาสตร์',
      'อาคารจุฬาภรณ์ คณะวิทยาศาสตร์',
      'อาคารเสาวรัจ นิตยวรรธนะ',
    ];

    for (const name of buildings) {
      const existing = await this.repository.findOne({
        where: { name: name },
      });

      if (!existing) {
        const newBuilding = this.repository.create({
          name: name,
        });
        await this.repository.save(newBuilding);
        console.log(`Seeded building: ${name}`);
      } else {
        console.log(`Building already exists: ${name}`);
      }
    }
  }
}
