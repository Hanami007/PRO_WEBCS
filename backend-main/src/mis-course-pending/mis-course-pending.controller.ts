import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { Public } from 'src/auth/decorators/public.decorator';
import { MisCoursePendingService } from './mis-course-pending.service';
import { CreateMisCoursePendingDto } from './dto/create-mis-course-pending.dto';
import { UpdateMisCoursePendingDto } from './dto/update-mis-course-pending.dto';

@ApiTags('MIS - Course Pending (ระบบแจ้งตกค้างรายวิชา)')
@Controller('mis-course-pending')
export class MisCoursePendingController {
  constructor(private readonly service: MisCoursePendingService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'แจ้งตกค้างรายวิชา (Public)' })
  @ApiResponse({ status: 201, description: 'แจ้งสำเร็จ' })
  create(@Body() dto: CreateMisCoursePendingDto) {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการแจ้งตกค้างทั้งหมด (Admin)' })
  findAll(@Paginate() query: PaginateQuery) {
    return this.service.findAll(query);
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดตาม ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'อัพเดทสถานะ / แก้ไข (Admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateMisCoursePendingDto) {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'ลบรายการ (Admin)' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
