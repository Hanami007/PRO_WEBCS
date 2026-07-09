import * as path from 'path';
import { Carousel } from 'src/carousels/entities/carousel.entity';
import { File } from 'src/files/entities/file.entity';
import { DataSource } from 'typeorm';

export async function migrateCarousel(oldDb: DataSource, newDb: DataSource) {
  console.log('Starting Carousel Migration');
  const oldBanners = await oldDb.query('SELECT * FROM banners');
  const newCarouselRepo = newDb.getRepository(Carousel);

  const fileRepo = newDb.getRepository(File);

  for (const oldBanner of oldBanners) {
    const newFile = fileRepo.create({
      path: path.join('files', 'banners', oldBanner.banner),
    });

    await fileRepo.save(newFile);

    const newCarousel = newCarouselRepo.create({
      title: oldBanner.id,
      description: '',
      isActive: oldBanner.is_show,
      image: newFile,
      createdAt: oldBanner.created_at,
      updatedAt: oldBanner.updated_at || oldBanner.created_at || new Date(),
      deletedAt: oldBanner.is_del ? new Date() : undefined,
    });
    await newCarouselRepo.save(newCarousel);
  }
  console.log('Carousel Migration Complete');
}
