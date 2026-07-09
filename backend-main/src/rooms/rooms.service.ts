import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { FilesService } from 'src/files/files.service';
import { PersonnelService } from 'src/personnel/personnel.service';
import { BuildingsService } from 'src/buildings/buildings.service';
import { RoomTypeService } from 'src/room-type/room-type.service';
import {
  FilterOperator,
  FilterSuffix,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    private readonly filesService: FilesService,
    private readonly personnelService: PersonnelService,
    private readonly buildingService: BuildingsService,
    private readonly roomTypeService: RoomTypeService,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    const { personnel, building, type, ...rest } = createRoomDto;

    if (personnel?.id) {
      const personnelObject = await this.personnelService.findOne(personnel.id);
      if (!personnelObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            personnel: 'personnelNotExists',
          },
        });
      }
    }

    if (building?.id) {
      const buildingObject = await this.buildingService.findOne(building.id);
      if (!buildingObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            building: 'buildingNotExists',
          },
        });
      }
    }

    if (type?.id) {
      const typeObject = await this.roomTypeService.findOne(type.id);
      if (!typeObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            type: 'typeNotExists',
          },
        });
      }
    }

    const room = this.roomsRepository.create({
      ...rest,
      personnel,
      building,
      type,
    });
    return await this.roomsRepository.save(room);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Room>> {
    return await paginate(query, this.roomsRepository, {
      sortableColumns: ['code', 'nameTh', 'nameEn', 'floor', 'capacity'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['code', 'nameTh', 'nameEn'],
      relations: ['personnel', 'building', 'type', 'image'],
      select: [
        'id',
        'code',
        'nameTh',
        'nameEn',
        'floor',
        'capacity',
        'personnel.id',
        'personnel.fullnameTh',
        'building.id',
        'building.name',
        'type.id',
        'type.name',
        'image.id',
        'image.path',
        'createdAt',
        'updatedAt',
      ],
      filterableColumns: {
        'building.id': [FilterOperator.EQ, FilterSuffix.NOT],
        'type.id': [FilterOperator.EQ, FilterSuffix.NOT],
      },
    });
  }

  findOne(id: string) {
    return this.roomsRepository.findOne({
      where: { id },
      relations: ['personnel', 'building', 'type', 'image'],
    });
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    const { personnel, building, type, ...rest } = updateRoomDto;

    if (personnel?.id) {
      const personnelObject = await this.personnelService.findOne(personnel.id);
      if (!personnelObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            personnel: 'personnelNotExists',
          },
        });
      }
    }

    if (building?.id) {
      const buildingObject = await this.buildingService.findOne(building.id);
      if (!buildingObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            building: 'buildingNotExists',
          },
        });
      }
    }

    if (type?.id) {
      const typeObject = await this.roomTypeService.findOne(type.id);
      if (!typeObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            type: 'typeNotExists',
          },
        });
      }
    }

    const room = await this.roomsRepository.preload({
      id,
      ...rest,
      personnel,
      building,
      type,
    });

    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return this.roomsRepository.save(room);
  }

  async updateImage(id: string, file: Express.Multer.File) {
    const room = await this.roomsRepository.findOne({ where: { id } });

    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }

    const image = await this.filesService.create(file);

    await this.roomsRepository.update(id, {
      image,
    });

    return image;
  }

  async removeImage(id: string) {
    const room = await this.roomsRepository.findOne({
      where: { id },
      relations: ['image'],
    });

    if (!room) {
      return;
    }

    if (!room.image) {
      return;
    }

    const imageId = room.image.id;
    room.image = null;
    await this.roomsRepository.save(room);

    try {
      await this.filesService.remove(imageId);
    } catch (error) {
      console.error(`Failed to delete file ${imageId}:`, error);
    }

    return { success: true };
  }

  remove(id: string) {
    return this.roomsRepository.delete(id);
  }
}
