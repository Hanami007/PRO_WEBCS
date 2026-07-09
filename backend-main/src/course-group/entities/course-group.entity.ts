import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CourseGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  credits: number;

  @ManyToOne(() => CourseGroup, (group) => group.children, { nullable: true })
  parent: CourseGroup;

  @OneToMany(() => CourseGroup, (group) => group.parent)
  children: CourseGroup[];
}
