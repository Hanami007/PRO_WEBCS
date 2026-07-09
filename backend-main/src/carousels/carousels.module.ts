import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarouselsController } from './carousels.controller';
import { CarouselsService } from './carousels.service';
import { Carousel } from './entities/carousel.entity';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Carousel]), FilesModule],
  controllers: [CarouselsController],
  providers: [CarouselsService],
})
export class CarouselsModule {}
