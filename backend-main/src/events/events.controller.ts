import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PaginatedEventResponseDto } from './dto/paginated-event.dto';
import { Public } from 'src/auth/decorators/public.decorator';

import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { RoleEnum } from '../roles/roles.enum';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { Event } from './entities/event.entity';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Events (กิจกรรม)')
@Controller('events')
export class EventsController {
  constructor(private readonly service: EventsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการกิจกรรม (พร้อม Pagination)' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'ค้นหาชื่อกิจกรรม',
    example: 'Open House',
    type: String,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'เรียงลำดับ (field:ASC/DESC)',
    example: 'startsAt:DESC',
    type: String,
  })
  @ApiResponse({
    status: 200,
    type: PaginatedEventResponseDto,
    description: 'ดึงข้อมูลสำเร็จ',
  })
  async list(@Paginate() query: PaginateQuery): Promise<Paginated<Event>> {
    return this.service.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดกิจกรรมตาม ID' })
  @ApiResponse({ status: 200, type: CreateEventDto })
  async getOne(@Param('id') id: string): Promise<Event> {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.admin)
  @Post()
  @ApiOperation({ summary: 'สร้างกิจกรรมใหม่' })
  @ApiResponse({ status: 201, type: CreateEventDto })
  async create(@Body() dto: CreateEventDto): Promise<Event> {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.admin)
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขกิจกรรม' })
  @ApiBody({ type: UpdateEventDto })
  @ApiResponse({ status: 200, type: CreateEventDto })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateEventDto,
  ): Promise<Event> {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.admin)
  @Delete(':id')
  @ApiOperation({ summary: 'ลบกิจกรรม' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
