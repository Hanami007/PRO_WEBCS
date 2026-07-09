import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutContentsService } from './about-contents.service';
import { AboutContentsController } from './about-contents.controller';
import { AboutContent } from './entities/about-content.entity';
import { FilesModule } from '../files/files.module';
import { AboutSectionsModule } from '../about-sections/about-sections.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AboutContent]),
    FilesModule,
    AboutSectionsModule,
  ],
  controllers: [AboutContentsController],
  providers: [AboutContentsService],
})
export class AboutContentsModule {}
