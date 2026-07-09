import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { PaginatedTestimonialResponseDto } from './dto/paginated-testimonial.dto';
import { Public } from '../auth/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { Testimonial } from './entities/testimonial.entity';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Testimonials (ความคิดเห็นศิษย์เก่า/นักศึกษา)')
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly service: TestimonialsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการความคิดเห็นทั้งหมด (พร้อม Pagination)' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'ค้นหาชื่อผู้รีวิว',
    example: 'สมชาย',
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
    type: PaginatedTestimonialResponseDto,
    description: 'ดึงข้อมูลสำเร็จ',
  })
  async list(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<Testimonial>> {
    return this.service.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดความคิดเห็นตาม ID' })
  @ApiResponse({ status: 200, type: CreateTestimonialDto })
  async getOne(@Param('id') id: string): Promise<Testimonial> {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'สร้างความคิดเห็นใหม่ (พร้อมรูปภาพ)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        authorName: {
          type: 'string',
          description: 'ชื่อผู้ให้ความเห็น',
          example: 'นาย ก. (ศิษย์เก่า)',
        },
        authorTitle: {
          type: 'string',
          description: 'ตำแหน่ง/อาชีพ',
          example: 'Senior Developer',
        },
        content: {
          type: 'string',
          description: 'ข้อความรีวิว',
          example: 'หลักสูตรดีมาก...',
        },
        isActive: {
          type: 'boolean',
          description: 'แสดงผลหรือไม่',
          example: true,
        },
        testimonials_image: {
          type: 'string',
          format: 'binary',
          description: 'รูปภาพประกอบ',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('testimonials_image'))
  async create(
    @UploadedFile() testimonials_image: Express.Multer.File,
    @Body() dto: CreateTestimonialDto,
  ): Promise<Testimonial> {
    return this.service.create(dto, testimonials_image);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขความคิดเห็น' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        authorName: {
          type: 'string',
          description: 'ชื่อผู้ให้ความเห็น',
          example: 'นาย ก. (ศิษย์เก่า)',
        },
        authorTitle: {
          type: 'string',
          description: 'ตำแหน่ง/อาชีพ',
          example: 'Senior Developer',
        },
        content: {
          type: 'string',
          description: 'ข้อความรีวิว',
          example: 'หลักสูตรดีมาก...',
        },
        isActive: {
          type: 'boolean',
          description: 'แสดงผลหรือไม่',
          example: true,
        },
        testimonials_image: {
          type: 'string',
          format: 'binary',
          description: 'รูปภาพประกอบ (ถ้าต้องการเปลี่ยน)',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('testimonials_image'))
  async update(
    @Param('id') id: string,
    @UploadedFile() testimonials_image: Express.Multer.File,
    @Body() dto: UpdateTestimonialDto,
  ): Promise<Testimonial> {
    return this.service.update(id, dto, testimonials_image);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'ลบความคิดเห็น' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
