import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from './entities/feature.entity';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import {
  paginate,
  PaginateQuery,
  Paginated,
  FilterOperator,
} from 'nestjs-paginate';
import { FilesService } from '../files/files.service';
import { File } from '../files/entities/file.entity';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private readonly repo: Repository<Feature>,
    private readonly filesService: FilesService,
  ) {}

  async findAll(query: PaginateQuery): Promise<Paginated<Feature>> {
    return paginate(query, this.repo, {
      relations: ['image'],
      sortableColumns: ['createdAt', 'updatedAt', 'title'],
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['title', 'description', 'value', 'type'],
      filterableColumns: {
        isActive: [FilterOperator.EQ],
      },
    });
  }

  async findOne(id: string): Promise<Feature> {
    const found = await this.repo.findOne({
      where: { id },
      relations: ['image'],
    });
    if (!found) throw new NotFoundException('Feature not found');
    return found;
  }

  async create(
    dto: CreateFeatureDto,
    file?: Express.Multer.File,
  ): Promise<Feature> {
    let image: File | null = null;

    if (file) {
      image = await this.filesService.create(file);
    }

    const entity = this.repo.create({
      ...dto,
      image,
      isActive: dto.isActive ?? true,
    });

    return this.repo.save(entity);
  }

  async update(
    id: string,
    dto: UpdateFeatureDto,
    file?: Express.Multer.File,
  ): Promise<Feature> {
    const entity = await this.findOne(id);

    if (file) {
      entity.image = await this.filesService.create(file);
    }

    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.softDelete(id);
  }
}
