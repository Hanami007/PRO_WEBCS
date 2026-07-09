import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseGroupDto } from './dto/create-course-group.dto';
import { UpdateCourseGroupDto } from './dto/update-course-group.dto';
import { CourseGroup } from './entities/course-group.entity';

@Injectable()
export class CourseGroupService {
  constructor(
    @InjectRepository(CourseGroup)
    private readonly courseGroupRepository: Repository<CourseGroup>,
  ) {}

  async create(
    createCourseGroupDto: CreateCourseGroupDto,
  ): Promise<CourseGroup> {
    const courseGroup = this.courseGroupRepository.create(createCourseGroupDto);
    return await this.courseGroupRepository.save(courseGroup);
  }

  async findAll(): Promise<CourseGroup[]> {
    return await this.courseGroupRepository.find({
      order: { name: 'ASC' },
      relations: ['parent', 'children'],
    });
  }

  async findOne(id: string): Promise<CourseGroup | null> {
    return await this.courseGroupRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
  }

  async update(
    id: string,
    updateCourseGroupDto: UpdateCourseGroupDto,
  ): Promise<CourseGroup | null> {
    const courseGroup = await this.courseGroupRepository.preload({
      id: id,
      ...updateCourseGroupDto,
    });

    if (!courseGroup) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          id: 'courseGroupNotFound',
        },
      });
    }

    return this.courseGroupRepository.save(courseGroup);
  }

  async remove(id: string) {
    await this.courseGroupRepository.delete(id);
    return { success: true };
  }
}
