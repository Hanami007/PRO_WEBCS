import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import {
  FilterOperator,
  FilterSuffix,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';
import { Program } from './entities/program.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private readonly programsRepository: Repository<Program>,
  ) {}

  async create(createProgramDto: CreateProgramDto): Promise<Program> {
    const program = this.programsRepository.create(createProgramDto);
    return this.programsRepository.save(program);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Program>> {
    const result = await paginate(query, this.programsRepository, {
      sortableColumns: [
        'nameEn',
        'createdAt',
        'updatedAt',
        'nameTh',
        'credits',
        'code',
      ],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'ASC']],
      searchableColumns: ['nameTh', 'nameEn', 'credits', 'code'],
      relations: [
        'programCourses',
        'programCourses.course',
        'programCourses.group',
        'programCourses.group.parent',
        'studyPlans',
        'studyPlans.course',
      ],
      loadEagerRelations: true,
      select: [
        'id',
        'code',
        'nameTh',
        'nameEn',
        'degreeThFull',
        'degreeEnFull',
        'degreeTh',
        'degreeEn',
        'credits',
        'revision',
        'duration',
        'languages',
        'tqf',
        'isCurrent',
        'isActive',
        'createdAt',
        'updatedAt',
        'programCourses.id',
        'programCourses.course.id',
        'programCourses.course.code',
        'programCourses.course.titleTh',
        'programCourses.course.titleEn',
        'programCourses.course.description',
        'programCourses.course.credits',
        'programCourses.course.lectureHours',
        'programCourses.course.labHours',
        'programCourses.course.selfStudyHours',
        'programCourses.course.isActive',
        'programCourses.group.id',
        'programCourses.group.name',
        'programCourses.group.credits',
        'programCourses.group.parent.id',
        'programCourses.group.parent.name',
        'studyPlans.id',
        'studyPlans.year',
        'studyPlans.semester',
        'studyPlans.label',
        'studyPlans.credit',
        'studyPlans.course.id',
        'studyPlans.course.code',
        'studyPlans.course.titleTh',
        'studyPlans.course.titleEn',
        'studyPlans.course.credits',
        'studyPlans.course.description',
        'studyPlans.course.lectureHours',
        'studyPlans.course.labHours',
        'studyPlans.course.selfStudyHours',
        'studyPlans.course.isActive',
      ],
      filterableColumns: {
        nameTh: [FilterOperator.EQ, FilterSuffix.NOT],
        nameEn: [FilterOperator.EQ, FilterSuffix.NOT],
        isCurrent: [FilterOperator.EQ],
        isActive: [FilterOperator.EQ],
      },
    });

    return result;
  }

  async findCurrent(): Promise<Program> {
    const program = await this.programsRepository.findOne({
      where: { isCurrent: true },
      relations: [
        'programCourses',
        'programCourses.course',
        'programCourses.group',
        'programCourses.group.parent',
        'studyPlans',
        'studyPlans.course',
      ],
      select: {
        id: true,
        code: true,
        nameTh: true,
        nameEn: true,
        degreeThFull: true,
        degreeEnFull: true,
        degreeTh: true,
        degreeEn: true,
        credits: true,
        revision: true,
        duration: true,
        languages: true,
        tqf: true,
        isCurrent: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        programCourses: {
          id: true,
          course: {
            id: true,
            code: true,
            titleTh: true,
            titleEn: true,
            description: true,
            credits: true,
            lectureHours: true,
            labHours: true,
            selfStudyHours: true,
            isActive: true,
          },
          group: {
            id: true,
            name: true,
            credits: true,
            parent: {
              id: true,
              name: true,
            },
          },
        },
        studyPlans: {
          id: true,
          year: true,
          semester: true,
          label: true,
          credit: true,
          course: {
            id: true,
            code: true,
            titleTh: true,
            titleEn: true,
            credits: true,
            description: true,
            labHours: true,
            lectureHours: true,
            selfStudyHours: true,
            isActive: true,
          },
        },
      },
    });

    if (!program) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          isCurrent: 'Current program not found',
        },
      });
    }

    return program;
  }

  async findOne(id: string): Promise<Program> {
    const program = await this.programsRepository.findOne({
      where: { id },
      relations: [
        'programCourses',
        'programCourses.course',
        'programCourses.group',
        'programCourses.group.parent',
        'studyPlans',
        'studyPlans.course',
      ],
      select: {
        id: true,
        code: true,
        nameTh: true,
        nameEn: true,
        degreeThFull: true,
        degreeEnFull: true,
        degreeTh: true,
        degreeEn: true,
        credits: true,
        revision: true,
        duration: true,
        languages: true,
        tqf: true,
        isCurrent: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        programCourses: {
          id: true,
          course: {
            id: true,
            code: true,
            titleTh: true,
            titleEn: true,
            description: true,
            credits: true,
            lectureHours: true,
            labHours: true,
            selfStudyHours: true,
            isActive: true,
          },
          group: {
            id: true,
            name: true,
            credits: true,
            parent: {
              id: true,
              name: true,
            },
          },
        },
        studyPlans: {
          id: true,
          year: true,
          semester: true,
          label: true,
          credit: true,
          course: {
            id: true,
            code: true,
            titleTh: true,
            titleEn: true,
            credits: true,
            description: true,
            lectureHours: true,
            labHours: true,
            selfStudyHours: true,
            isActive: true,
          },
        },
      },
    });

    if (!program) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          id: 'Program not found',
        },
      });
    }

    return program;
  }

  async update(
    id: string,
    updateProgramDto: UpdateProgramDto,
  ): Promise<Program> {
    if (updateProgramDto.isCurrent) {
      await this.programsRepository.update(
        { isCurrent: true },
        { isCurrent: false },
      );
    }
    const program = await this.programsRepository.preload({
      id,
      ...updateProgramDto,
    });

    if (!program) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          id: 'Program not found',
        },
      });
    }
    return this.programsRepository.save(program);
  }

  async remove(id: string) {
    await this.programsRepository.softDelete(id);
    return { success: true };
  }
}
