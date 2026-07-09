import { ApiProperty } from '@nestjs/swagger';
import { Type } from '@nestjs/common';

export interface PaginationOptions {
  sortBy?: [string, string][];
  searchBy?: string[];
  filter?: { [key: string]: string | string[] };
}

/**
 * PaginationResponse is a factory function that generates a Swagger-compatible
 * DTO for paginated responses.
 */
export function PaginationResponse<T>(
  classRef: Type<T>,
  options: PaginationOptions = {},
) {
  const {
    sortBy = [['createdAt', 'DESC']],
    searchBy = [],
    filter = {},
  } = options;

  const suffix = classRef.name;

  class PaginateMeta {
    @ApiProperty({ example: 10 })
    itemsPerPage: number;

    @ApiProperty({ example: 100 })
    totalItems: number;

    @ApiProperty({ example: 1 })
    currentPage: number;

    @ApiProperty({ example: 10 })
    totalPages: number;

    @ApiProperty({ example: sortBy })
    sortBy: [string, string][];

    @ApiProperty({ example: searchBy })
    searchBy: string[];

    @ApiProperty({ example: {} })
    search: { [key: string]: string };

    @ApiProperty({ example: filter })
    filter: { [key: string]: string | string[] };
  }
  Object.defineProperty(PaginateMeta, 'name', {
    value: `PaginateMeta${suffix}`,
  });

  abstract class Pagination {
    @ApiProperty({ type: [classRef] })
    data: T[];

    @ApiProperty({ type: PaginateMeta })
    meta: PaginateMeta;
  }
  Object.defineProperty(Pagination, 'name', { value: `Paginated${suffix}` });

  return Pagination;
}
