import { PaginationResponse } from 'src/utils/pagination-response.dto';
import { CreateAboutSectionDto } from './create-about-section.dto';

export class PaginatedAboutSectionResponseDto extends PaginationResponse(
  CreateAboutSectionDto,
  {
    sortBy: [['sortOrder', 'ASC']],
    searchBy: ['title', 'slug'],
  },
) {}
