import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComplainsService } from './complains.service';
import { CreateComplainDto } from './dto/create-complain.dto';
import { UpdateComplainDto } from './dto/update-complain.dto';
import { PaginatedComplainResponseDto } from './dto/paginated-complain.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { Complain } from './entities/complain.entity';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Complains (ข้อเสนอแนะ/ร้องเรียน)')
@Controller('complains')
export class ComplainsController {
  constructor(private readonly complainsService: ComplainsService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'ส่งเรื่องร้องเรียน/ข้อเสนอแนะ' })
  @ApiResponse({
    status: 201,
    description: 'ส่งเรื่องสำเร็จ',
    type: CreateComplainDto,
  })
  create(@Body() createComplainDto: CreateComplainDto) {
    return this.complainsService.create(createComplainDto);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการข้อเสนอแนะทั้งหมด (พร้อม Pagination)' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'ค้นหาหัวข้อ หรือ รายละเอียด',
    example: 'แอร์',
    type: String,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'เรียงลำดับ (field:ASC/DESC)',
    example: 'createdAt:DESC',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'ดึงข้อมูลสำเร็จ',
    type: PaginatedComplainResponseDto,
  })
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Complain>> {
    return this.complainsService.findAll(query);
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดตาม ID' })
  @ApiResponse({
    status: 200,
    description: 'เจอข้อมูล',
    type: CreateComplainDto,
  })
  @ApiResponse({ status: 404, description: 'ไม่พบข้อมูล' })
  findOne(@Param('id') id: string) {
    return this.complainsService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขคำแนะนำ/เรื่องร้องเรียน' })
  @ApiBody({ type: UpdateComplainDto })
  @ApiResponse({
    status: 200,
    description: 'แก้ไขสำเร็จ',
    type: CreateComplainDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateComplainDto: UpdateComplainDto,
  ) {
    return this.complainsService.update(id, updateComplainDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'ลบคำแนะนำ/เรื่องร้องเรียน' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  remove(@Param('id') id: string) {
    return this.complainsService.remove(id);
  }
}
