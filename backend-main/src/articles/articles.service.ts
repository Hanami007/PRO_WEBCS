import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import {
  FilterOperator,
  FilterSuffix,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { File } from 'src/files/entities/file.entity';
import { FilesService } from 'src/files/files.service';
import { ArticleImagesService } from 'src/article-images/article-images.service';
import { ArticleImage } from 'src/article-images/entities/article-image.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
    private readonly filesService: FilesService,
    private readonly articleImageService: ArticleImagesService,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = this.articlesRepository.create(createArticleDto);
    return await this.articlesRepository.save(article);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Article>> {
    return await paginate(query, this.articlesRepository, {
      sortableColumns: ['category'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['title', 'createdAt', 'updatedAt'],
      relations: ['thumbnail', 'contentImages'],
      select: [
        'id',
        'slug',
        'title',
        'content',
        'link',
        'published',
        'category',
        'thumbnail.id',
        'thumbnail.path',
        'contentImages.id',
        'contentImages.file',
        'createdAt',
        'updatedAt',
      ],
      filterableColumns: {
        title: [FilterOperator.EQ, FilterSuffix.NOT],
      },
    });
  }

  async findOne(id: string): Promise<Article | null> {
    return await this.articlesRepository.findOne({
      where: { id },
      relations: ['thumbnail', 'contentImages'],
    });
  }

  async update(
    id: Article['id'],
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article | null> {
    let thumbnail: File | null | undefined = undefined;

    if (updateArticleDto.thumbnail?.id) {
      const fileObject = await this.filesService.findById(
        updateArticleDto.thumbnail.id,
      );

      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            thumbnail: 'imageNotExists',
          },
        });
      }
      thumbnail = fileObject;
    } else if (updateArticleDto.thumbnail === null) {
      thumbnail = null;
    }

    const article = await this.articlesRepository.preload({
      id: id,
      ...updateArticleDto,
      thumbnail,
    });

    if (!article) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          id: 'articleNotFound',
        },
      });
    }

    return this.articlesRepository.save(article);
  }

  async remove(id: string) {
    const article = await this.articlesRepository.findOne({
      where: { id },
      relations: ['thumbnail', 'contentImages', 'contentImages.file'],
    });

    if (!article) {
      return { success: true };
    }

    // Delete content images (and their files) first
    if (article.contentImages && article.contentImages.length > 0) {
      for (const image of article.contentImages) {
        await this.articleImageService.remove(image.id);
      }
    }

    // Detach thumbnail before deleting the article
    if (article.thumbnail) {
      const thumbnailId = article.thumbnail.id;
      await this.articlesRepository.update(id, { thumbnail: null });
      try {
        await this.filesService.remove(thumbnailId);
      } catch (error) {
        console.error(`Failed to delete thumbnail file ${thumbnailId}:`, error);
      }
    }

    await this.articlesRepository.delete(id);
    return { success: true };
  }


  async createImage(
    id: string,
    file: Express.Multer.File,
  ): Promise<ArticleImage | null> {
    const article = await this.articlesRepository.findOne({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          id: 'articleNotFound',
        },
      });
    }

    return await this.articleImageService.create(article, file);
  }

  async removeThumbnail(id: string) {
    const article = await this.articlesRepository.findOne({
      where: { id },
      relations: ['thumbnail'],
    });

    if (!article) {
      return;
    }

    if (!article.thumbnail) {
      return;
    }

    await this.articlesRepository.update(id, {
      thumbnail: null,
    });

    try {
      await this.filesService.remove(article.thumbnail.id);
    } catch (error) {
      console.error(`Failed to delete file ${article.thumbnail.id}:`, error);
    }

    return { success: true };
  }
}
