import { Building } from 'src/buildings/entities/building.entity';
import { File } from 'src/files/entities/file.entity';
import { Personnel } from 'src/personnel/entities/personnel.entity';
import { RoomType } from 'src/room-type/entities/room-type.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  code: string;

  @Column('varchar', { length: 255 })
  nameTh: string;

  @Column('varchar', { length: 255, nullable: true })
  nameEn: string;

  @ManyToOne(() => Personnel)
  @JoinColumn()
  personnel: Personnel;

  @ManyToOne(() => Building)
  @JoinColumn()
  building: Building;

  @Column({
    type: 'varchar',
    length: 10,
  })
  floor: string;

  @Column({
    type: 'int',
    comment: 'จำนวนที่นั่ง',
    nullable: true,
  })
  capacity: number;

  @OneToOne(() => File, { eager: true, nullable: true })
  @JoinColumn()
  image: File | null;

  @ManyToOne(() => RoomType)
  @JoinColumn()
  type: RoomType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
