import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Personnel } from 'src/personnel/entities/personnel.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('personnel_profiles')
export class PersonnelProfile {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Personnel, (personnel) => personnel.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  personnel: Personnel;

  @ApiProperty({ example: 'Experienced professor in Computer Science...' })
  @Column({ type: 'text', nullable: true })
  bio: string;

  @ApiProperty({ example: 'Maejo University' })
  @Column({ nullable: true })
  workplace: string;

  @ApiProperty({ example: 'NestJS, TypeScript, PostgreSQL' })
  @Column({ type: 'text', nullable: true })
  skills: string;

  @ApiProperty({ example: 'Artificial Intelligence, Software Engineering' })
  @Column({ type: 'text', nullable: true })
  experts: string;

  @ApiProperty({
    example: 'Senior Developer at Tech Corp (2020-2023)',
  })
  @Column({ type: 'text', nullable: true })
  experiences: string;

  @ApiProperty({
    example: 'Deep Learning in Agriculture (2022)',
  })
  @Column({ type: 'text', nullable: true })
  researches: string;

  @ApiProperty({ example: true })
  @Column({ default: true })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
