import { PaginationResponse } from 'src/utils/pagination-response.dto';
import { CreateProgramCourseDto } from './create-program-course.dto';

export class PaginatedProgramCourseResponseDto extends PaginationResponse(
  CreateProgramCourseDto,
  {
    sortBy: [['createdAt', 'DESC']],
    searchBy: [
      'program.nameTh',
      'program.nameEn',
      'course.code',
      'course.titleTh',
      'course.titleEn',
      'group.name',
    ],
  },
) {}
