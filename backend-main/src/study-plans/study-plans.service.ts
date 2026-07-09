import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudyPlanDto } from './dto/create-study-plan.dto';
import { UpdateStudyPlanDto } from './dto/update-study-plan.dto';
import { StudyPlan } from './entities/study-plan.entity';
import {
  FilterOperator,
  FilterSuffix,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';

@Injectable()
export class StudyPlansService {
  constructor(
    @InjectRepository(StudyPlan)
    private readonly studyPlansRepository: Repository<StudyPlan>,
  ) {}

  async create(createStudyPlanDto: CreateStudyPlanDto): Promise<StudyPlan> {
    const studyPlan = this.studyPlansRepository.create(createStudyPlanDto);
    return await this.studyPlansRepository.save(studyPlan);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<StudyPlan>> {
    return await paginate(query, this.studyPlansRepository, {
      sortableColumns: ['createdAt', 'year', 'semester'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
      relations: ['program', 'course'],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterSuffix.NOT],
        year: [FilterOperator.EQ, FilterSuffix.NOT],
        semester: [FilterOperator.EQ, FilterSuffix.NOT],
        'program.id': [FilterOperator.EQ],
        'course.id': [FilterOperator.EQ],
      },
    });
  }

  async findOne(id: string): Promise<StudyPlan | null> {
    const studyPlan = await this.studyPlansRepository.findOne({
      where: { id },
      relations: ['program', 'course'],
    });
    if (!studyPlan) {
      throw new NotFoundException('Study plan not found');
    }
    return studyPlan;
  }

  async update(
    id: string,
    updateStudyPlanDto: UpdateStudyPlanDto,
  ): Promise<StudyPlan> {
    const studyPlan = await this.studyPlansRepository.preload({
      id,
      ...updateStudyPlanDto,
    });

    if (!studyPlan) {
      throw new NotFoundException('Study plan not found');
    }

    return await this.studyPlansRepository.save(studyPlan);
  }

  async remove(id: string) {
    const result = await this.studyPlansRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Study plan not found');
    }
    return { success: true };
  }
}
