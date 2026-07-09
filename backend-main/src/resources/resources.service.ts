import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private readonly repo: Repository<Resource>,
  ) {}

  async findAll(query: PaginateQuery): Promise<Paginated<Resource>> {
    return paginate(query, this.repo, {
      sortableColumns: ['id', 'key', 'createdAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['key', 'value', 'description'],
    });
  }

  async findOne(id: string): Promise<Resource> {
    const entity = await this.repo.findOne({
      where: { id },
    });
    if (!entity) throw new NotFoundException('Resource not found');
    return entity;
  }

  async findByKey(key: string): Promise<Resource> {
    const entity = await this.repo.findOne({
      where: { key },
    });
    if (!entity)
      throw new NotFoundException(`Resource with key "${key}" not found`);
    return entity;
  }

  async create(createDto: CreateResourceDto): Promise<Resource> {
    const existing = await this.repo.findOne({
      where: { key: createDto.key },
    });

    if (existing) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          key: 'resourceKeyAlreadyExists',
        },
      });
    }

    return this.repo.save(this.repo.create(createDto));
  }

  async update(id: string, updateDto: UpdateResourceDto): Promise<Resource> {
    const entity = await this.findOne(id);

    if (updateDto.key && updateDto.key !== entity.key) {
      const existing = await this.repo.findOne({
        where: { key: updateDto.key, id: Not(id) },
      });

      if (existing) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            key: 'resourceKeyAlreadyExists',
          },
        });
      }
    }

    return this.repo.save({ ...entity, ...updateDto });
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.softRemove(entity);
  }
}
