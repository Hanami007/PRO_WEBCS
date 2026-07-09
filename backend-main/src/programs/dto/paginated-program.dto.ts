import { PaginationResponse } from 'src/utils/pagination-response.dto';
import { CreateProgramDto } from './create-program.dto';

export class PaginatedProgramResponseDto extends PaginationResponse(
  CreateProgramDto,
  {
    sortBy: [['updatedAt', 'DESC']],
    searchBy: ['nameTh', 'nameEn', 'credits', 'code'],
  },
) {}
