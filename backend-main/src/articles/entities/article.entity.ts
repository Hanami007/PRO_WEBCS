import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SlugUtils } from 'src/utils/generate-slug';
import { File } from 'src/files/entities/file.entity';
import { ArticleImage } from 'src/article-images/entities/article-image.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    type: 'text',
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  content: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  link: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  category: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  published: boolean;

  @OneToOne(() => File, {
    eager: true,
  })
  @JoinColumn()
  thumbnail?: File | null;

  @OneToMany(() => ArticleImage, (articleImage) => articleImage.article)
  contentImages?: ArticleImage[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  generateSlug() {
    if (!this.slug && this.title) {
      this.slug = SlugUtils.generate(this.title, true);
    }
  }

  @BeforeUpdate()
  updateSlug() {
    if (this.title) {
      this.slug = SlugUtils.generate(this.title, true);
    }
  }
}
