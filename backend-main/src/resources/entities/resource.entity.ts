import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    comment:
      'The unique identifier for the frontend (e.g., youtube_link, admission_link)',
  })
  key: string;

  @Column({
    type: 'text',
    comment: 'The actual content, link, or configuration value',
  })
  value: string;

  @Column({
    nullable: true,
    comment:
      'Internal description to help admins understand what this resource is for',
  })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
