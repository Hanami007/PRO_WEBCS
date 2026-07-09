import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimonial } from './entities/testimonial.entity';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import {
  paginate,
  Paginated,
  PaginateQuery,
  FilterOperator,
} from 'nestjs-paginate';
import { Express } from 'express';
import { FilesService } from '../files/files.service';
import { File } from '../files/entities/file.entity';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private readonly repo: Repository<Testimonial>,
    private readonly filesService: FilesService,
  ) {}

  private async findOrFail(id: string): Promise<Testimonial> {
    const found = await this.repo.findOne({
      where: { id },
      relations: ['image'],
    });
    if (!found) throw new NotFoundException('Testimonial not found');
    return found;
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Testimonial>> {
    return paginate(query, this.repo, {
      relations: ['image'],
      sortableColumns: ['createdAt', 'updatedAt', 'authorName', 'authorTitle'],
      searchableColumns: ['authorName', 'authorTitle', 'content'],
      defaultSortBy: [['createdAt', 'DESC']],
      filterableColumns: {
        isActive: [FilterOperator.EQ],
      },
    });
  }

  async findOne(id: string): Promise<Testimonial> {
    return this.findOrFail(id);
  }

  async create(
    dto: CreateTestimonialDto,
    file?: Express.Multer.File,
  ): Promise<Testimonial> {
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
    dto: UpdateTestimonialDto,
    file?: Express.Multer.File,
  ): Promise<Testimonial> {
    const entity = await this.findOrFail(id);

    if (file) {
      entity.image = await this.filesService.create(file);
    }

    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: string): Promise<void> {
    await this.findOrFail(id);
    await this.repo.softDelete(id);
  }
}
