import { PaginationResponse } from 'src/utils/pagination-response.dto';
import { PersonnelProfile } from '../entities/personnel-profile.entity';

export class PaginatedPersonnelProfileResponseDto extends PaginationResponse(
  PersonnelProfile,
  {
    sortBy: [['createdAt', 'DESC']],
    searchBy: ['workplace', 'bio'],
  },
) {}
