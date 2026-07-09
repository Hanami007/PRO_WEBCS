import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutSection } from 'src/about-sections/entities/about-section.entity';
import { AboutContent } from 'src/about-contents/entities/about-content.entity';
import { AboutSeedService } from './about-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([AboutSection, AboutContent])],
  providers: [AboutSeedService],
  exports: [AboutSeedService],
})
export class AboutSeedModule {}
