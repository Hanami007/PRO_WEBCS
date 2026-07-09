import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { FilesModule } from 'src/files/files.module';
import { Personnel } from 'src/personnel/entities/personnel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Personnel]), FilesModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
