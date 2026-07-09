import { PaginationResponse } from 'src/utils/pagination-response.dto';
import { CreateProjectDto } from './create-project.dto';

export class PaginatedProjectResponseDto extends PaginationResponse(
  CreateProjectDto,
  {
    sortBy: [['createdAt', 'DESC']],
    searchBy: ['name', 'code', 'detail', 'editors'],
  },
) {}
