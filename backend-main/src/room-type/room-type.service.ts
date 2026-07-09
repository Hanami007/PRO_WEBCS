import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';
import { RoomType } from './entities/room-type.entity';

@Injectable()
export class RoomTypeService {
  constructor(
    @InjectRepository(RoomType)
    private roomTypeRepository: Repository<RoomType>,
  ) {}

  create(createRoomTypeDto: CreateRoomTypeDto) {
    const roomType = this.roomTypeRepository.create(createRoomTypeDto);
    return this.roomTypeRepository.save(roomType);
  }

  findAll() {
    return this.roomTypeRepository.find();
  }

  findOne(id: string) {
    return this.roomTypeRepository.findOne({ where: { id } });
  }

  update(id: string, updateRoomTypeDto: UpdateRoomTypeDto) {
    return this.roomTypeRepository.update(id, updateRoomTypeDto);
  }

  remove(id: string) {
    return this.roomTypeRepository.delete(id);
  }
}
