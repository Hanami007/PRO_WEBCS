import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { CourseGroup } from 'src/course-group/entities/course-group.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Program } from 'src/programs/entities/program.entity';
import { Repository } from 'typeorm';
import { CreateProgramCourseDto } from './dto/create-program-course.dto';
import { UpdateProgramCourseDto } from './dto/update-program-course.dto';
import { ProgramCourse } from './entities/program-course.entity';

@Injectable()
export class ProgramCoursesService {
  constructor(
    @InjectRepository(ProgramCourse)
    private readonly programCoursesRepository: Repository<ProgramCourse>,
    @InjectRepository(Program)
    private readonly programsRepository: Repository<Program>,
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    @InjectRepository(CourseGroup)
    private readonly courseGroupsRepository: Repository<CourseGroup>,
  ) {}

  async create(
    createProgramCourseDto: CreateProgramCourseDto,
  ): Promise<ProgramCourse> {
    const program = await this.programsRepository.findOneBy({
      id: createProgramCourseDto.program.id,
    });
    if (!program) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          program: 'programNotExists',
        },
      });
    }

    const course = await this.coursesRepository.findOneBy({
      id: createProgramCourseDto.course.id,
    });
    if (!course) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          course: 'courseNotExists',
        },
      });
    }

    const group = await this.courseGroupsRepository.findOneBy({
      id: createProgramCourseDto.group.id,
    });
    if (!group) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          group: 'groupNotExists',
        },
      });
    }

    const programCourse = this.programCoursesRepository.create({
      ...createProgramCourseDto,
      program,
      course,
      group,
    });
    return await this.programCoursesRepository.save(programCourse);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<ProgramCourse>> {
    return await paginate(query, this.programCoursesRepository, {
      sortableColumns: ['id', 'createdAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: [
        'program.nameTh',
        'program.nameEn',
        'course.code',
        'course.titleTh',
        'course.titleEn',
        'group.name',
      ],
      relations: ['program', 'course', 'group'],
      select: [
        'id',
        'program.id',
        'program.nameTh',
        'program.nameEn',
        'course.id',
        'course.code',
        'course.titleTh',
        'course.titleEn',
        'course.credits',
        'group.id',
        'group.name',
        'createdAt',
        'updatedAt',
      ],
      filterableColumns: {
        'program.id': [FilterOperator.EQ],
        'course.id': [FilterOperator.EQ],
        'group.id': [FilterOperator.EQ],
      },
    });
  }

  async findOne(id: string): Promise<ProgramCourse | null> {
    return await this.programCoursesRepository.findOne({
      where: { id },
      relations: ['program', 'course', 'group'],
    });
  }

  async update(
    id: string,
    updateProgramCourseDto: UpdateProgramCourseDto,
  ): Promise<ProgramCourse | null> {
    let program: Program | null | undefined = undefined;
    if (updateProgramCourseDto.program?.id) {
      const programObject = await this.programsRepository.findOneBy({
        id: updateProgramCourseDto.program.id,
      });
      if (!programObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            program: 'programNotExists',
          },
        });
      }
      program = programObject;
    }

    let course: Course | null | undefined = undefined;
    if (updateProgramCourseDto.course?.id) {
      const courseObject = await this.coursesRepository.findOneBy({
        id: updateProgramCourseDto.course.id,
      });
      if (!courseObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            course: 'courseNotExists',
          },
        });
      }
      course = courseObject;
    }

    let group: CourseGroup | null | undefined = undefined;
    if (updateProgramCourseDto.group?.id) {
      const groupObject = await this.courseGroupsRepository.findOneBy({
        id: updateProgramCourseDto.group.id,
      });
      if (!groupObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            group: 'groupNotExists',
          },
        });
      }
      group = groupObject;
    }

    const programCourse = await this.programCoursesRepository.preload({
      id: id,
      ...updateProgramCourseDto,
      ...(program && { program }),
      ...(course && { course }),
      ...(group && { group }),
    });

    if (!programCourse) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          id: 'programCourseNotFound',
        },
      });
    }

    return this.programCoursesRepository.save(programCourse);
  }

  async remove(id: string) {
    await this.programCoursesRepository.delete(id);
    return { success: true };
  }
}
