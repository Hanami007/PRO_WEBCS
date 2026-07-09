import { PaginationResponse } from 'src/utils/pagination-response.dto';
import { CreateEventDto } from './create-event.dto';

export class PaginatedEventResponseDto extends PaginationResponse(
  CreateEventDto,
  {
    sortBy: [['startsAt', 'DESC']],
    searchBy: ['title', 'description', 'organizer', 'location'],
  },
) {}
