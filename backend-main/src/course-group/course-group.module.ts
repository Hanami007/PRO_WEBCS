import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseGroupController } from './course-group.controller';
import { CourseGroupService } from './course-group.service';
import { CourseGroup } from './entities/course-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseGroup])],
  controllers: [CourseGroupController],
  providers: [CourseGroupService],
})
export class CourseGroupModule {}
