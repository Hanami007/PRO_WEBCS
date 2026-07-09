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
import { Public } from 'src/auth/decorators/public.decorator';
import { CourseGroupService } from './course-group.service';
import { CreateCourseGroupDto } from './dto/create-course-group.dto';
import { UpdateCourseGroupDto } from './dto/update-course-group.dto';
import { CourseGroup } from './entities/course-group.entity';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Course Groups (กลุ่มวิชา/หมวดวิชา)')
@Controller('course-group')
export class CourseGroupController {
  constructor(private readonly courseGroupService: CourseGroupService) {}

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'สร้างกลุ่มวิชาใหม่' })
  @ApiResponse({ status: 201, type: CreateCourseGroupDto })
  async create(
    @Body() createCourseGroupDto: CreateCourseGroupDto,
  ): Promise<CourseGroup> {
    return await this.courseGroupService.create(createCourseGroupDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการกลุ่มวิชาทั้งหมด' })
  @ApiResponse({ status: 200, type: CreateCourseGroupDto, isArray: true })
  async findAll(): Promise<CourseGroup[]> {
    return await this.courseGroupService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดกลุ่มวิชาตาม ID' })
  @ApiResponse({ status: 200, type: CreateCourseGroupDto })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CourseGroup | null> {
    return await this.courseGroupService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขกลุ่มวิชา' })
  @ApiBody({ type: UpdateCourseGroupDto })
  @ApiResponse({ status: 200, type: CreateCourseGroupDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCourseGroupDto: UpdateCourseGroupDto,
  ): Promise<CourseGroup | null> {
    return await this.courseGroupService.update(id, updateCourseGroupDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'ลบกลุ่มวิชา' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.courseGroupService.remove(id);
  }
}
