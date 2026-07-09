import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { FilesModule } from 'src/files/files.module';
import { ArticleImagesModule } from 'src/article-images/article-images.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    FilesModule,
    ArticleImagesModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
