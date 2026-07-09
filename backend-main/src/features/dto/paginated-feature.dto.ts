import { PaginationResponse } from 'src/utils/pagination-response.dto';
import { CreateFeatureDto } from './create-feature.dto';

export class PaginatedFeatureResponseDto extends PaginationResponse(
  CreateFeatureDto,
  {
    sortBy: [['createdAt', 'DESC']],
    searchBy: ['title', 'description', 'value', 'type'],
  },
) {}
