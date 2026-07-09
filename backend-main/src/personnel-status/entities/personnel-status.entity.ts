import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PersonnelStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'สถานะการทำงานของบุคลากร',
  })
  name: string;
}
