import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutSection } from './entities/about-section.entity';
import { CreateAboutSectionDto } from './dto/create-about-section.dto';
import { UpdateAboutSectionDto } from './dto/update-about-section.dto';
import {
  FilterOperator,
  FilterSuffix,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';

@Injectable()
export class AboutSectionsService {
  constructor(
    @InjectRepository(AboutSection)
    private readonly aboutSectionRepository: Repository<AboutSection>,
  ) {}

  async create(dto: CreateAboutSectionDto): Promise<AboutSection> {
    const aboutSection = this.aboutSectionRepository.create(dto);
    return this.aboutSectionRepository.save(aboutSection);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<AboutSection>> {
    return paginate(query, this.aboutSectionRepository, {
      sortableColumns: ['id', 'title', 'sortOrder', 'createdAt'],
      nullSort: 'last',
      defaultSortBy: [['sortOrder', 'ASC']],
      relations: ['contents'],
      searchableColumns: ['title', 'slug'],
      filterableColumns: {
        id: [FilterOperator.EQ, FilterSuffix.NOT],
      },
    });
  }

  async findOne(id: string): Promise<AboutSection | null> {
    return await this.aboutSectionRepository.findOne({
      where: { id },
      relations: ['contents', 'contents.image'],
      order: {
        contents: {
          sortOrder: 'ASC',
        },
      },
    });
  }

  async update(
    id: AboutSection['id'],
    dto: UpdateAboutSectionDto,
  ): Promise<AboutSection | null> {
    return this.aboutSectionRepository.save({
      id: id,
      title: dto.title,
      sortOrder: dto.sortOrder,
    });
  }

  async remove(id: string): Promise<void> {
    await this.aboutSectionRepository.softDelete(id);
  }
}
