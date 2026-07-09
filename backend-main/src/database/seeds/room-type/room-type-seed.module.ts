import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType } from 'src/room-type/entities/room-type.entity';
import { RoomTypeSeedService } from './room-type-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType])],
  providers: [RoomTypeSeedService],
  exports: [RoomTypeSeedService],
})
export class RoomTypeSeedModule {}
