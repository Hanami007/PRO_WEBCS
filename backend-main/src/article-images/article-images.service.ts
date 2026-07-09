import { promises as fs } from 'fs';
import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ArticleImage } from './entities/article-image.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from 'src/files/entities/file.entity';
import { Article } from 'src/articles/entities/article.entity';

@Injectable()
export class ArticleImagesService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(ArticleImage)
    private readonly articleImageRepository: Repository<ArticleImage>,
  ) {}

  async create(
    article: Article,
    file: Express.Multer.File,
  ): Promise<ArticleImage | null> {
    if (!file) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          file: 'selectFile',
        },
      });
    }

    return await this.dataSource.transaction(async (entityManager) => {
      const newFile = await entityManager.save(
        entityManager.create(File, {
          path: file.path,
        }),
      );
      const newImage = await entityManager.save(
        entityManager.create(ArticleImage, {
          article,
          file: newFile,
        }),
      );

      return newImage;
    });
  }

  async remove(id: string) {
    const articleImage = await this.articleImageRepository.findOne({
      where: { id },
      relations: ['file'],
    });

    if (!articleImage) {
      throw new NotFoundException('Article image not found');
    }

    try {
      await fs.unlink(articleImage.file.path);
    } catch (error) {
      console.log('Error deleting file.', error);
    }

    await this.dataSource.transaction(async (manager) => {
      await manager.delete(ArticleImage, id);
      await manager.delete(File, articleImage.file.id);
    });

    return { success: true };
  }
}
