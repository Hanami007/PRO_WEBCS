import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MisCoursePending } from './entities/mis-course-pending.entity';
import { MisCoursePendingService } from './mis-course-pending.service';
import { MisCoursePendingController } from './mis-course-pending.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MisCoursePending])],
  controllers: [MisCoursePendingController],
  providers: [MisCoursePendingService],
})
export class MisCoursePendingModule {}
