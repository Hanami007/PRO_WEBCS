import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomType } from 'src/room-type/entities/room-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomTypeSeedService {
  constructor(
    @InjectRepository(RoomType)
    private repository: Repository<RoomType>,
  ) {}

  async run() {
    const types = ['ห้องปฏิบัติการ', 'ห้องบรรยาย', 'ห้องอื่นๆ'];

    for (const name of types) {
      const existing = await this.repository.findOne({
        where: { name: name },
      });

      if (!existing) {
        const newType = this.repository.create({
          name: name,
        });
        await this.repository.save(newType);
        console.log(`Seeded type: ${name}`);
      } else {
        console.log(`Type already exists: ${name}`);
      }
    }
  }
}
