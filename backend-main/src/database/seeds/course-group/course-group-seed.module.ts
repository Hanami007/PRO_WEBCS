import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseGroup } from 'src/course-group/entities/course-group.entity';
import { CourseGroupSeedService } from './course-group-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseGroup])],
  providers: [CourseGroupSeedService],
  exports: [CourseGroupSeedService],
})
export class CourseGroupSeedModule {}
