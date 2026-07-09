import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carousel } from 'src/carousels/entities/carousel.entity';
import { FilesService } from 'src/files/files.service';
import { CAROUSEL_SEED_DATA } from './carousel.data';
import * as path from 'path';

@Injectable()
export class CarouselSeedService {
  constructor(
    @InjectRepository(Carousel)
    private readonly carouselRepository: Repository<Carousel>,
    private readonly filesService: FilesService,
  ) {}

  async run() {
    const count = await this.carouselRepository.count();

    if (count === 0) {
      console.log('Seeding Carousels...');

      const assetsDir = path.resolve(
        process.cwd(),
        'assets',
        'seeds',
        'carousels',
      );

      for (const data of CAROUSEL_SEED_DATA) {
        const sourcePath = path.join(assetsDir, data.image);

        try {
          const savedFile = await this.filesService.createFromLocalPath(
            sourcePath,
            'carousels',
          );

          const carousel = this.carouselRepository.create({
            title: data.title,
            description: data.description,
            isActive: true,
            sortOrder: data.sortOrder,
            image: savedFile,
          });

          await this.carouselRepository.save(carousel);
        } catch (error) {
          console.error(
            `Failed to seed carousel image ${data.image}: ${error.message}`,
          );
        }
      }
      console.log(`Seeded ${CAROUSEL_SEED_DATA.length} carousels.`);
    } else {
      console.log('Carousels already exist. Skipping seed.');
    }
  }
}
