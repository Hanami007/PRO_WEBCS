import { PaginationResponse } from 'src/utils/pagination-response.dto';
import { CreateTestimonialDto } from './create-testimonial.dto';

export class PaginatedTestimonialResponseDto extends PaginationResponse(
  CreateTestimonialDto,
  {
    sortBy: [['createdAt', 'DESC']],
    searchBy: ['authorName', 'authorTitle', 'content'],
  },
) {}
