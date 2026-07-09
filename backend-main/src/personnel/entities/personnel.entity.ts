import { Expose, Exclude } from 'class-transformer';
import { File } from 'src/files/entities/file.entity';
import { PersonnelStatus } from 'src/personnel-status/entities/personnel-status.entity';
import { PersonnelProfile } from 'src/personnel-profiles/entities/personnel-profile.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

@Entity('personnel')
export class Personnel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => PersonnelProfile, (profile) => profile.personnel)
  profile: PersonnelProfile;

  @Expose({ groups: ['admin'] })
  @Column({
    type: 'varchar',
    length: 13,
    nullable: true,
    comment: 'รหัสบัตรประชาชน (Citizen ID)',
  })
  citizenId: string | null;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: 'คำนำหน้าชื่อ (e.g., Dr., Mr., Ms.)',
  })
  prefix: string | null;

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'ชื่อ-นามสกุล (ไทย)',
  })
  fullnameTh: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'ชื่อ-นามสกุล (อังกฤษ)',
  })
  fullnameEn: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'ตำแหน่งทางวิชาการ (e.g., Professor, Lecturer)',
  })
  academicPosition: string | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'ตำแหน่งทางบริหาร (e.g., Dean, Head of Dept)',
  })
  administrativePosition: string | null;

  @OneToOne(() => File, {
    eager: true,
  })
  @JoinColumn()
  profileImage: File | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'อีเมล',
  })
  email: string | null;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: 'เบอร์โทรศัพท์',
  })
  phoneNumber: string | null;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'ประวัติการศึกษา',
  })
  education: string | null;

  @Column({
    type: 'varchar',
    length: 100,
    comment: 'ประเภทของบุคลากร',
  })
  personnelType: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'ประเภททางมหาวิทยาลัย',
  })
  academicType: string | null;

  @ManyToOne(() => PersonnelStatus)
  @JoinColumn()
  workStatus: PersonnelStatus | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;
}
