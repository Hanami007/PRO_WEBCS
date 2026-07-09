import { PaginationResponse } from 'src/utils/pagination-response.dto';
import { CreateAlumniDto } from './create-alumni.dto';

export class PaginatedAlumniResponseDto extends PaginationResponse(
  CreateAlumniDto,
  {
    sortBy: [['createdAt', 'DESC']],
    searchBy: ['fullName', 'cohort', 'workplace'],
  },
) {}
