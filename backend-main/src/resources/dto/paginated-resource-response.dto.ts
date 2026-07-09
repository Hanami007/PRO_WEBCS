import { PaginationResponse } from 'src/utils/pagination-response.dto';
import { ResourceResponseDto } from './resource-response.dto';

export class PaginatedResourceResponseDto extends PaginationResponse(
  ResourceResponseDto,
  {
    sortBy: [['createdAt', 'DESC']],
    searchBy: ['key', 'value', 'description'],
  },
) {}
