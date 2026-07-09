import { PaginationResponse } from 'src/utils/pagination-response.dto';
import { CreateContactDto } from './create-contact.dto';

export class PaginatedContactResponseDto extends PaginationResponse(
  CreateContactDto,
  {
    sortBy: [['createdAt', 'ASC']],
    searchBy: [],
  },
) {}
