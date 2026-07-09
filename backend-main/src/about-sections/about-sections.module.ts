import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutSectionsService } from './about-sections.service';
import { AboutSectionsController } from './about-sections.controller';
import { AboutSection } from './entities/about-section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AboutSection])],
  controllers: [AboutSectionsController],
  providers: [AboutSectionsService],
  exports: [AboutSectionsService], // Export service in case AboutContents needs it
})
export class AboutSectionsModule {}
