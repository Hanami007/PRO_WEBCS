import { PaginationResponse } from 'src/utils/pagination-response.dto';
import { CreateRoomDto } from './create-room.dto';

export class PaginatedRoomResponseDto extends PaginationResponse(
  CreateRoomDto,
  {
    sortBy: [['createdAt', 'DESC']],
    searchBy: ['code', 'nameTh', 'nameEn'],
  },
) {}
