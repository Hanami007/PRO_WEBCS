import { PaginationResponse } from 'src/utils/pagination-response.dto';
import { CreateCarouselDto } from './create-carousel.dto';

export class PaginatedCarouselResponseDto extends PaginationResponse(
  CreateCarouselDto,
  {
    sortBy: [['sortOrder', 'ASC']],
    searchBy: ['title', 'description'],
  },
) {}
