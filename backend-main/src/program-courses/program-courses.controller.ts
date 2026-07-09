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
import { CreateProgramCourseDto } from './dto/create-program-course.dto';
import { UpdateProgramCourseDto } from './dto/update-program-course.dto';
import { PaginatedProgramCourseResponseDto } from './dto/paginated-program-course.dto';
import { ProgramCourse } from './entities/program-course.entity';
import { ProgramCoursesService } from './program-courses.service';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Program Courses (วิชาในหลักสูตร)')
@Controller('program-courses')
export class ProgramCoursesController {
  constructor(private readonly programCoursesService: ProgramCoursesService) {}

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'เพิ่มวิชาในหลักสูตร' })
  @ApiResponse({ status: 201, type: CreateProgramCourseDto })
  async create(
    @Body() createProgramCourseDto: CreateProgramCourseDto,
  ): Promise<ProgramCourse> {
    return await this.programCoursesService.create(createProgramCourseDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการวิชาในหลักสูตร (พร้อม Pagination)' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'ค้นหา (เช่น ตามรหัสวิชา)',
    example: 'คพ313',
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
    type: PaginatedProgramCourseResponseDto,
    description: 'ดึงข้อมูลสำเร็จ',
  })
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<ProgramCourse>> {
    return await this.programCoursesService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดตาม ID' })
  @ApiResponse({ status: 200, type: CreateProgramCourseDto })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ProgramCourse | null> {
    return await this.programCoursesService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขข้อมูล' })
  @ApiBody({ type: UpdateProgramCourseDto })
  @ApiResponse({ status: 200, type: CreateProgramCourseDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProgramCourseDto: UpdateProgramCourseDto,
  ): Promise<ProgramCourse | null> {
    return await this.programCoursesService.update(id, updateProgramCourseDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'ลบข้อมูล' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.programCoursesService.remove(id);
  }
}
