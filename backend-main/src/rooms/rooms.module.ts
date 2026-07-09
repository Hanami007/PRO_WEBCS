import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { FilesModule } from 'src/files/files.module';
import { PersonnelModule } from 'src/personnel/personnel.module';
import { BuildingsModule } from 'src/buildings/buildings.module';
import { RoomTypeModule } from 'src/room-type/room-type.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    FilesModule,
    PersonnelModule,
    BuildingsModule,
    RoomTypeModule,
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
