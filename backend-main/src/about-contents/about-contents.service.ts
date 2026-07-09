import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutContent } from './entities/about-content.entity';
import { CreateAboutContentDto } from './dto/create-about-content.dto';
import { UpdateAboutContentDto } from './dto/update-about-content.dto';
import { FilesService } from '../files/files.service';
import { File } from '../files/entities/file.entity';
import { AboutSectionsService } from '../about-sections/about-sections.service';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { AboutSection } from 'src/about-sections/entities/about-section.entity';
import { LayoutTypeEnum } from './layouts.enum';

@Injectable()
export class AboutContentsService {
  constructor(
    @InjectRepository(AboutContent)
    private readonly repo: Repository<AboutContent>,
    private readonly filesService: FilesService,
    private readonly aboutSectionsService: AboutSectionsService,
  ) {}

  async findAll(query: PaginateQuery): Promise<Paginated<AboutContent>> {
    return paginate(query, this.repo, {
      sortableColumns: ['id', 'title', 'layoutType', 'sortOrder', 'createdAt'],
      nullSort: 'last',
      defaultSortBy: [['sortOrder', 'ASC']],
      searchableColumns: ['title', 'body'],
      relations: ['section', 'image'],
      filterableColumns: {
        section: [FilterOperator.EQ],
        'section.id': [FilterOperator.EQ],
      },
    });
  }

  async findOne(id: string): Promise<AboutContent> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['section', 'image'],
    });
    if (!entity) throw new NotFoundException('AboutContent not found');
    return entity;
  }

  async create(
    createAboutContentDto: CreateAboutContentDto,
  ): Promise<AboutContent> {
    // Do not remove comment below.
    // <creating-property />

    let section: AboutSection | null | undefined = undefined;

    if (createAboutContentDto.section?.id) {
      const sectionObject = await this.aboutSectionsService.findOne(
        createAboutContentDto.section.id,
      );

      if (!sectionObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            section: 'sectionNotExists',
          },
        });
      }
      section = sectionObject;
    } else {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          section: 'sectionIdRequired',
        },
      });
    }

    let image: File | null | undefined = undefined;

    if (createAboutContentDto.image?.id) {
      const fileObject = await this.filesService.findById(
        createAboutContentDto.image.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            image: 'imageNotExists',
          },
        });
      }
      image = fileObject;
    } else if (createAboutContentDto.image === null) {
      image = null;
    }

    let layout: string | null | undefined = undefined;

    if (createAboutContentDto.layoutType) {
      const layoutObject = Object.values(LayoutTypeEnum)
        .map(String)
        .includes(createAboutContentDto.layoutType);

      if (!layoutObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            role: 'incorrectLayoutType',
          },
        });
      }
      layout = createAboutContentDto.layoutType;
    }

    return this.repo.save({
      // Do not remove comment below.
      // <creating-property-payload />
      title: createAboutContentDto.title,
      body: createAboutContentDto.body,
      layoutType: layout,
      sortOrder: createAboutContentDto.sortOrder,
      section: section,
      image: image,
    });
  }

  async update(
    id: AboutContent['id'],
    updateAboutContentDto: UpdateAboutContentDto,
  ): Promise<AboutContent | null> {
    // Do not remove comment below.
    // <updating-property />

    let section: AboutSection | null | undefined = undefined;

    if (updateAboutContentDto.section?.id) {
      const sectionObject = await this.aboutSectionsService.findOne(
        updateAboutContentDto.section.id,
      );

      if (!sectionObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            section: 'sectionNotExists',
          },
        });
      }
      section = sectionObject;
    }

    let image: File | null | undefined = undefined;

    if (updateAboutContentDto.image?.id) {
      const fileObject = await this.filesService.findById(
        updateAboutContentDto.image.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            image: 'imageNotExists',
          },
        });
      }
      image = fileObject;
    } else if (updateAboutContentDto.image === null) {
      image = null;
    }

    let layout: string | null | undefined = undefined;

    if (updateAboutContentDto.layoutType) {
      const layoutObject = Object.values(LayoutTypeEnum)
        .map(String)
        .includes(updateAboutContentDto.layoutType);

      if (!layoutObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            role: 'incorrectLayoutType',
          },
        });
      }
      layout = updateAboutContentDto.layoutType;
    }

    return this.repo.save({
      id: id,
      // Do not remove comment below.
      // <updating-property-payload />
      title: updateAboutContentDto.title,
      body: updateAboutContentDto.body,
      layoutType: layout,
      sortOrder: updateAboutContentDto.sortOrder,
      section: section,
      image: image,
    });
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}
