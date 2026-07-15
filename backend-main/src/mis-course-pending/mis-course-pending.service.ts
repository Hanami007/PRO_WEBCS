import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { MisCoursePending } from './entities/mis-course-pending.entity';
import { CreateMisCoursePendingDto } from './dto/create-mis-course-pending.dto';
import { UpdateMisCoursePendingDto } from './dto/update-mis-course-pending.dto';

@Injectable()
export class MisCoursePendingService {
  constructor(
    @InjectRepository(MisCoursePending)
    private readonly repository: Repository<MisCoursePending>,
  ) {}

  create(dto: CreateMisCoursePendingDto): Promise<MisCoursePending> {
    const record = this.repository.create(dto);
    return this.repository.save(record);
  }

  findAll(query: PaginateQuery): Promise<Paginated<MisCoursePending>> {
    return paginate(query, this.repository, {
      sortableColumns: ['id', 'studentId', 'courseCode', 'status', 'createdAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['studentId', 'studentName', 'courseCode', 'courseName'],
      filterableColumns: { status: true },
    });
  }

  findOne(id: string): Promise<MisCoursePending | null> {
    return this.repository.findOne({ where: { id } });
  }

  update(id: string, dto: UpdateMisCoursePendingDto) {
    return this.repository.update(id, dto);
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }
}
