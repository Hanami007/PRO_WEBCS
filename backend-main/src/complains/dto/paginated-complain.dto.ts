import { PaginationResponse } from 'src/utils/pagination-response.dto';
import { CreateComplainDto } from './create-complain.dto';

export class PaginatedComplainResponseDto extends PaginationResponse(
  CreateComplainDto,
  {
    sortBy: [['createdAt', 'DESC']],
    searchBy: ['title', 'detail'],
  },
) {}
