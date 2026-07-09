import { PaginationResponse } from 'src/utils/pagination-response.dto';
import { ArticleDto } from './article.dto';

export class PaginatedArticleResponseDto extends PaginationResponse(
  ArticleDto,
  {
    sortBy: [['createdAt', 'DESC']],
    searchBy: ['title'],
  },
) {}
