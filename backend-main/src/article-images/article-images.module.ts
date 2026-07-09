import { Module } from '@nestjs/common';
import { ArticleImagesService } from './article-images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleImage } from './entities/article-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleImage])],
  providers: [ArticleImagesService],
  exports: [ArticleImagesService],
})
export class ArticleImagesModule {}
