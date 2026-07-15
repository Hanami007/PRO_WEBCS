import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EquipmentBorrowStatus {
  BORROWED = 'borrowed',
  RETURNED = 'returned',
  OVERDUE = 'overdue',
}

@Entity()
export class MisEquipmentBorrow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  borrowerName: string;

  @Column({ type: 'varchar', length: 255 })
  equipmentName: string;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'date' })
  borrowDate: string;

  @Column({ type: 'date' })
  returnDate: string;

  @Column({
    type: 'enum',
    enum: EquipmentBorrowStatus,
    default: EquipmentBorrowStatus.BORROWED,
  })
  status: EquipmentBorrowStatus;

  @Column({ type: 'text', nullable: true })
  note: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
