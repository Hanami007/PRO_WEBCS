import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  DeleteDateColumn,
} from 'typeorm';
import { AboutContent } from '../../about-contents/entities/about-content.entity';
import { SlugUtils } from 'src/utils/generate-slug';

@Entity('about_sections')
export class AboutSection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  slug: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @OneToMany(() => AboutContent, (content) => content.section)
  contents: AboutContent[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

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
