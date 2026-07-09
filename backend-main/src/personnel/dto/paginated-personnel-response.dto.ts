import { PaginationResponse } from 'src/utils/pagination-response.dto';
import { CreatePersonnelDto } from './create-personnel.dto';

export class PaginatedPersonnelResponseDto extends PaginationResponse(
  CreatePersonnelDto,
  {
    sortBy: [['id', 'DESC']],
    searchBy: ['fullnameTh', 'fullnameEn', 'email'],
  },
) {}
