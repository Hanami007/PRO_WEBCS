import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  FilterSuffix,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.coursesRepository.create(createCourseDto);
    return await this.coursesRepository.save(course);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Course>> {
    return await paginate(query, this.coursesRepository, {
      sortableColumns: ['code', 'titleTh', 'titleEn', 'createdAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['code', 'titleTh', 'titleEn'],
      select: [
        'id',
        'code',
        'titleTh',
        'titleEn',
        'description',
        'credits',
        'lectureHours',
        'labHours',
        'selfStudyHours',
        'isActive',
        'createdAt',
        'updatedAt',
      ],
      filterableColumns: {
        isActive: [FilterOperator.EQ],
        titleTh: [FilterOperator.EQ, FilterSuffix.NOT],
      },
    });
  }

  async findOne(id: string): Promise<Course | null> {
    return await this.coursesRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<Course | null> {
    const course = await this.coursesRepository.preload({
      id: id,
      ...updateCourseDto,
    });

    if (!course) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          id: 'courseNotFound',
        },
      });
    }

    return this.coursesRepository.save(course);
  }

  async remove(id: string) {
    await this.coursesRepository.delete(id);
    return { success: true };
  }
}
