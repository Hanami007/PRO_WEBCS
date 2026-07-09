import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Public } from 'src/auth/decorators/public.decorator';
import { StudyPlansService } from './study-plans.service';
import { CreateStudyPlanDto } from './dto/create-study-plan.dto';
import { UpdateStudyPlanDto } from './dto/update-study-plan.dto';
import { PaginatedStudyPlanResponseDto } from './dto/paginated-study-plan.dto';
import { StudyPlan } from './entities/study-plan.entity';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Study Plans (แผนการเรียน)')
@Controller('study-plans')
export class StudyPlansController {
  constructor(private readonly studyPlansService: StudyPlansService) {}

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'สร้างแผนการเรียนใหม่' })
  @ApiResponse({ status: 201, type: CreateStudyPlanDto })
  async create(
    @Body() createStudyPlanDto: CreateStudyPlanDto,
  ): Promise<StudyPlan> {
    return await this.studyPlansService.create(createStudyPlanDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการแผนการเรียน (พร้อม Pagination)' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'ค้นหาชื่อแผน',
    example: 'แผน ก',
    type: String,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'เรียงลำดับ (field:ASC/DESC)',
    example: 'year:ASC',
    type: String,
  })
  @ApiResponse({
    status: 200,
    type: PaginatedStudyPlanResponseDto,
    description: 'ดึงข้อมูลสำเร็จ',
  })
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<StudyPlan>> {
    return await this.studyPlansService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดแผนการเรียนตาม ID' })
  @ApiResponse({ status: 200, type: CreateStudyPlanDto })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<StudyPlan | null> {
    return await this.studyPlansService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขแผนการเรียน' })
  @ApiBody({ type: UpdateStudyPlanDto })
  @ApiResponse({ status: 200, type: CreateStudyPlanDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStudyPlanDto: UpdateStudyPlanDto,
  ): Promise<StudyPlan> {
    return await this.studyPlansService.update(id, updateStudyPlanDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'ลบแผนการเรียน' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.studyPlansService.remove(id);
  }
}
