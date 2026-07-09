import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carousel } from 'src/carousels/entities/carousel.entity';
import { CarouselSeedService } from './carousel-seed.service';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Carousel]), FilesModule],
  providers: [CarouselSeedService],
  exports: [CarouselSeedService],
})
export class CarouselSeedModule {}
