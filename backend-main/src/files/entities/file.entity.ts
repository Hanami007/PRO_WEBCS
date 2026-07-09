import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import appConfig from 'src/config/app.config';
import { AppConfig } from 'src/config/app-config.type';

@Entity({ name: 'file' })
export class File {
  @ApiProperty({
    type: String,
    example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae',
  })
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    example: 'https://example.com/path/to/file.jpg',
  })
  @Exclude()
  @Column()
  path: string;

  @Expose()
  @Transform(
    ({ obj }) => {
      if (!obj.path) {
        return null;
      }
      return `${(appConfig() as AppConfig).backendDomain}/${obj.path.replace(/\\/g, '/')}`;
    },
    {
      toPlainOnly: true,
    },
  )
  url: string;

  @ApiProperty({
    type: String,
    example: '2023-02-10T04:01:38.000Z',
  })
  @CreateDateColumn()
  createdAt: Date;
}
