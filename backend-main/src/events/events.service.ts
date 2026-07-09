import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {
  paginate,
  Paginated,
  PaginateQuery,
  FilterOperator,
} from 'nestjs-paginate';
import { FilesService } from '../files/files.service';
import { File } from '../files/entities/file.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly repo: Repository<Event>,
    private readonly filesService: FilesService,
  ) {}

  private async findOrFail(id: string): Promise<Event> {
    const found = await this.repo.findOne({
      where: { id },
      relations: ['poster'],
    });
    if (!found) throw new NotFoundException('Event not found');
    return found;
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Event>> {
    return paginate(query, this.repo, {
      relations: ['poster'],
      sortableColumns: [
        'createdAt',
        'updatedAt',
        'title',
        'startsAt',
        'endsAt',
        'location',
      ],
      searchableColumns: ['title', 'description', 'organizer', 'location'],
      defaultSortBy: [['startsAt', 'DESC']],
      filterableColumns: {
        isActive: [FilterOperator.EQ],
      },
    });
  }

  async findOne(id: string): Promise<Event> {
    return this.findOrFail(id);
  }

  async create(dto: CreateEventDto): Promise<Event> {
    const { poster: posterDto, ...rest } = dto;
    let poster: File | null = null;

    if (posterDto?.id) {
      const fileObject = await this.filesService.findById(posterDto.id);
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            poster: 'imageNotExists',
          },
        });
      }
      poster = fileObject;
    }

    const entity = this.repo.create({
      ...rest,
      poster,
      isActive: dto.isActive ?? true,
    });

    return this.repo.save(entity);
  }

  async update(id: string, dto: UpdateEventDto): Promise<Event> {
    const entity = await this.findOrFail(id);
    const { poster: posterDto, ...rest } = dto;

    if (posterDto?.id) {
      const fileObject = await this.filesService.findById(posterDto.id);
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            poster: 'imageNotExists',
          },
        });
      }
      entity.poster = fileObject;
    } else if (posterDto === null) {
      entity.poster = null;
    }

    Object.assign(entity, rest);
    return this.repo.save(entity);
  }

  async remove(id: string): Promise<void> {
    await this.findOrFail(id);
    await this.repo.softDelete(id);
  }
}
