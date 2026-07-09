import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PaginatedProjectResponseDto } from './dto/paginated-project.dto';
import { Project } from './entities/project.entity';
import { Public } from '../auth/decorators/public.decorator';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Projects (โครงงานนักศึกษา)')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'สร้างโครงงานใหม่' })
  @ApiResponse({ status: 201, type: CreateProjectDto })
  async create(@Body() dto: CreateProjectDto): Promise<Project> {
    return this.service.create(dto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการโครงงาน (พร้อม Pagination)' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'ค้นหาชื่อโครงงาน',
    example: 'IoT',
    type: String,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'เรียงลำดับ (field:ASC/DESC)',
    example: 'year:DESC',
    type: String,
  })
  @ApiResponse({
    status: 200,
    type: PaginatedProjectResponseDto,
    description: 'ดึงข้อมูลสำเร็จ',
  })
  async list(@Paginate() query: PaginateQuery): Promise<Paginated<Project>> {
    return this.service.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดโครงงานตาม ID' })
  @ApiResponse({ status: 200, type: CreateProjectDto })
  async getOne(@Param('id', ParseUUIDPipe) id: string): Promise<Project> {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขโครงงาน' })
  @ApiBody({ type: UpdateProjectDto })
  @ApiResponse({ status: 200, type: CreateProjectDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProjectDto,
  ): Promise<Project> {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'ลบโครงงาน' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ message: string }> {
    return await this.service.remove(id);
  }
}
