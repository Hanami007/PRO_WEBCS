import { PaginationResponse } from 'src/utils/pagination-response.dto';
import { CreateStudyPlanDto } from './create-study-plan.dto';

export class PaginatedStudyPlanResponseDto extends PaginationResponse(
  CreateStudyPlanDto,
  {
    sortBy: [['createdAt', 'DESC']],
    searchBy: [],
  },
) {}
