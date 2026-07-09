import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { Repository } from 'typeorm';
import { COURSE_SEED_DATA } from './course.data';

@Injectable()
export class CourseSeedService {
  constructor(
    @InjectRepository(Course)
    private repository: Repository<Course>,
  ) {}

  async run() {
    const courses = COURSE_SEED_DATA;

    for (const course of courses) {
      const existing = await this.repository.findOne({
        where: { code: course.code },
      });

      if (!existing) {
        const newCourse = this.repository.create(course);
        await this.repository.save(newCourse);
        console.log(`Seeded course: ${course.titleEn}`);
      } else {
        console.log(`Course already exists: ${course.titleEn}`);
      }
    }
  }
}
