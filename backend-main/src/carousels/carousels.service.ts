import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carousel } from './entities/carousel.entity';
import { CreateCarouselDto } from './dto/create-carousel.dto';
import { UpdateCarouselDto } from './dto/update-carousel.dto';
import {
  PaginateQuery,
  Paginated,
  paginate,
  FilterOperator,
} from 'nestjs-paginate';
import { FilesService } from 'src/files/files.service';
import { File } from 'src/files/entities/file.entity';

@Injectable()
export class CarouselsService {
  constructor(
    @InjectRepository(Carousel)
    private readonly repo: Repository<Carousel>,
    private readonly filesService: FilesService,
  ) {}

  async create(dto: CreateCarouselDto): Promise<Carousel> {
    const { image: imageDto, ...rest } = dto;
    let image: File | null = null;

    if (imageDto?.id) {
      const fileObject = await this.filesService.findById(imageDto.id);
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            image: 'imageNotExists',
          },
        });
      }
      image = fileObject;
    }

    const entity = this.repo.create({
      ...rest,
      image,
    });

    return this.repo.save(entity);
  }

  findAll(query: PaginateQuery): Promise<Paginated<Carousel>> {
    return paginate(query, this.repo, {
      sortableColumns: ['createdAt', 'updatedAt', 'sortOrder', 'title'],
      defaultSortBy: [['sortOrder', 'ASC']],
      searchableColumns: ['title', 'description'],
      relations: ['image'],
      filterableColumns: {
        isActive: [FilterOperator.EQ],
      },
    });
  }

  async findOne(id: string): Promise<Carousel> {
    const item = await this.repo.findOne({
      where: { id },
      relations: ['image'],
    });
    if (!item) throw new NotFoundException('Carousel not found');
    return item;
  }

  async update(id: string, dto: UpdateCarouselDto): Promise<Carousel> {
    const { image: imageDto, ...rest } = dto;
    let image: File | null | undefined = undefined;

    if (imageDto?.id) {
      const fileObject = await this.filesService.findById(imageDto.id);
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            image: 'imageNotExists',
          },
        });
      }
      image = fileObject;
    } else if (imageDto === null) {
      image = null;
    }

    const entity = await this.repo.preload({
      id,
      ...rest,
      image,
    });

    if (!entity) {
      throw new NotFoundException('Carousel not found');
    }

    return this.repo.save(entity);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { success: true };
  }
}
