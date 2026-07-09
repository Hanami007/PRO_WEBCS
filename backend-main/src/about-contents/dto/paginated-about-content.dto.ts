import { PaginationResponse } from 'src/utils/pagination-response.dto';
import { CreateAboutContentDto } from './create-about-content.dto';

export class PaginatedAboutContentResponseDto extends PaginationResponse(
  CreateAboutContentDto,
  {
    sortBy: [['sortOrder', 'DESC']],
    searchBy: ['title', 'body'],
  },
) {}
