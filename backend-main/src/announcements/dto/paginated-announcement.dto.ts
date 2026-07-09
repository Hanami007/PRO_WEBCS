import { PaginationResponse } from '../../utils/pagination-response.dto';
import { Announcement } from '../entities/announcement.entity';

export class PaginatedAnnouncementResponseDto extends PaginationResponse(
  Announcement,
  {
    sortBy: [['createdAt', 'DESC']],
    searchBy: ['title', 'description'],
  },
) {}
