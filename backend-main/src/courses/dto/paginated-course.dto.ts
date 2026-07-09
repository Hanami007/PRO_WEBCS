import { PaginationResponse } from 'src/utils/pagination-response.dto';
import { CreateCourseDto } from './create-course.dto';

export class PaginatedCourseResponseDto extends PaginationResponse(
  CreateCourseDto,
  {
    sortBy: [['createdAt', 'DESC']],
    searchBy: ['code', 'titleTh', 'titleEn'],
  },
) {}
