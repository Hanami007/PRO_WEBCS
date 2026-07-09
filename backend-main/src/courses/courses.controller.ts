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
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginatedCourseResponseDto } from './dto/paginated-course.dto';
import { Course } from './entities/course.entity';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Courses (รายวิชา)')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'สร้างรายวิชาใหม่' })
  @ApiResponse({ status: 201, type: CreateCourseDto })
  async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return await this.coursesService.create(createCourseDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'ดึงรายวิชาทั้งหมด (พร้อม Pagination)' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'ค้นหารหัสหรือชื่อวิชา',
    example: 'คพ313',
    type: String,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'เรียงลำดับ (field:ASC/DESC)',
    example: 'code:ASC',
    type: String,
  })
  @ApiResponse({
    status: 200,
    type: PaginatedCourseResponseDto,
    description: 'ดึงข้อมูลสำเร็จ',
  })
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Course>> {
    return await this.coursesService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดวิชาตาม ID' })
  @ApiResponse({ status: 200, type: CreateCourseDto })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Course | null> {
    return await this.coursesService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขรายวิชา' })
  @ApiBody({ type: UpdateCourseDto })
  @ApiResponse({ status: 200, type: CreateCourseDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course | null> {
    return await this.coursesService.update(id, updateCourseDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'ลบรายวิชา' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.coursesService.remove(id);
  }
}
