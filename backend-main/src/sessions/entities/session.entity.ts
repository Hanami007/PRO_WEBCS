import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity({ name: 'session' })
export class Session {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @ManyToOne(() => User, {
    eager: true,
  })
  @Index()
  user: User;

  @Exclude()
  @Column()
  hash: string;

  @Expose()
  @Column({ nullable: true })
  ip: string;

  @Expose()
  @Column({ nullable: true })
  userAgent: string;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;

  @Expose()
  isCurrent?: boolean;
}
