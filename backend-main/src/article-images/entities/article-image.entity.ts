import { Article } from 'src/articles/entities/article.entity';
import { File } from 'src/files/entities/file.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ArticleImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Article, (article) => article.contentImages)
  article: Article;

  @OneToOne(() => File, {
    eager: true,
  })
  @JoinColumn()
  file: File;
}
