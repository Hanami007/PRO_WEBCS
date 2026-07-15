import { File } from 'src/files/entities/file.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum RepairRequestStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
}

@Entity()
export class MisRepairRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  reporterName: string;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @Column({ type: 'varchar', length: 255 })
  itemName: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: RepairRequestStatus,
    default: RepairRequestStatus.PENDING,
  })
  status: RepairRequestStatus;

  @OneToOne(() => File, { eager: true, nullable: true })
  @JoinColumn()
  image: File | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
