import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { Announcement } from './entities/announcement.entity';
import { PaginatedAnnouncementResponseDto } from './dto/paginated-announcement.dto';
import { Public } from '../auth/decorators/public.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';

@ApiTags('Announcements (จัดการประกาศ)')
@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly service: AnnouncementsService) {}

  /* -------------------- PUBLIC -------------------- */

  @Public()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการประกาศ (พร้อม Pagination)' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'ค้นหาหัวข้อหรือคำอธิบาย',
    example: 'ปิดปรับปรุง',
    type: String,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'เรียงลำดับ (field:ASC/DESC)',
    example: 'createdAt:DESC',
    type: String,
  })
  @ApiQuery({
    name: 'filter.expiresAt',
    required: false,
    description: 'กรองวันหมดอายุ ($gt, $gte, $lt, $lte, $null)',
    example: '$gt:2026-03-16T00:00:00.000Z',
    type: String,
  })
  @ApiQuery({
    name: 'filter.publishedAt',
    required: false,
    description: 'กรองวันที่เผยแพร่ ($gt, $gte, $lt, $lte, $null)',
    example: '$lt:2026-03-16T00:00:00.000Z',
    type: String,
  })
  @ApiResponse({
    status: 200,
    type: PaginatedAnnouncementResponseDto,
    description: 'ดึงข้อมูลสำเร็จ',
  })
  async list(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Announcement>> {
    return this.service.findAll(query);
  }

  @Public()
  @Get('active')
  @ApiOperation({
    summary: 'ดึงรายการประกาศที่กำลังแสดงผล (ไม่ใช้ Pagination)',
  })
  @ApiResponse({
    status: 200,
    type: [Announcement],
    description: 'ดึงข้อมูลสำเร็จ',
  })
  async getActive(): Promise<Announcement[]> {
    return this.service.findActive();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดประกาศตาม ID' })
  @ApiResponse({ status: 200, type: Announcement })
  async getOne(@Param('id') id: string): Promise<Announcement> {
    return this.service.findOne(id);
  }

  /* -------------------- ADMIN ONLY -------------------- */

  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(RolesGuard)
  @Post()
  @ApiOperation({ summary: 'เพิ่มประกาศใหม่ (Admin Only)' })
  @ApiResponse({ status: 201, type: Announcement })
  async create(
    @Body() dto: CreateAnnouncementDto,
    @Request() req,
  ): Promise<Announcement> {
    return this.service.create(dto, req.user);
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(RolesGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขประกาศ (Admin Only)' })
  @ApiBody({ type: UpdateAnnouncementDto })
  @ApiResponse({ status: 200, type: Announcement })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAnnouncementDto,
  ): Promise<Announcement> {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'ลบประกาศ (Admin Only)' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
