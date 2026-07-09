import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'role' })
export class Role {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
