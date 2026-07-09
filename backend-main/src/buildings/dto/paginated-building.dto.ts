import { PaginationResponse } from 'src/utils/pagination-response.dto';
import { CreateBuildingDto } from './create-building.dto';

export class PaginatedBuildingResponseDto extends PaginationResponse(
  CreateBuildingDto,
  {
    sortBy: [['id', 'DESC']],
    searchBy: ['name'],
  },
) {}
