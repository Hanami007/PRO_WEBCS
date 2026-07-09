import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FeaturesService } from './features.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { PaginatedFeatureResponseDto } from './dto/paginated-feature.dto';
import { Feature } from './entities/feature.entity';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { RoleEnum } from '../roles/roles.enum';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Features (จุดเด่น/สถิติ)')
@Controller('features')
export class FeaturesController {
  constructor(private readonly service: FeaturesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการจุดเด่น/สถิติ' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'ค้นหาหัวข้อ',
    example: 'บัณฑิต',
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
    type: PaginatedFeatureResponseDto,
    description: 'ดึงข้อมูลสำเร็จ',
  })
  async list(@Paginate() query: PaginateQuery): Promise<Paginated<Feature>> {
    return this.service.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดจุดเด่นตาม ID' })
  @ApiResponse({ status: 200, type: CreateFeatureDto })
  async getOne(@Param('id') id: string): Promise<Feature> {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.admin)
  @Post()
  @ApiOperation({ summary: 'สร้างจุดเด่นใหม่ (พร้อมรูปภาพ)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'หัวข้อจุดเด่น',
          example: 'บัณฑิตได้งานทำ',
        },
        description: {
          type: 'string',
          description: 'รายละเอียด',
          example: 'สถิติย้อนหลัง...',
        },
        type: {
          type: 'string',
          description: 'ประเภท',
          example: 'statistic',
        },
        value: {
          type: 'string',
          description: 'ค่าข้อมูล',
          example: '95%',
        },
        prefix: {
          type: 'string',
          description: 'คำนำหน้า',
          example: 'กว่า',
        },
        suffix: {
          type: 'string',
          description: 'คำต่อท้าย',
          example: 'เปอร์เซ็นต์',
        },
        isActive: {
          type: 'boolean',
          description: 'เปิดใช้งาน',
          example: true,
        },
        image: {
          type: 'string',
          format: 'binary',
          description: 'รูปภาพประกอบ',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: CreateFeatureDto,
  ): Promise<Feature> {
    return this.service.create(dto, image);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.admin)
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขจุดเด่น (อัปโหลดรูปใหม่ได้)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'หัวข้อจุดเด่น',
          example: 'บัณฑิตได้งานทำ',
        },
        description: {
          type: 'string',
          description: 'รายละเอียด',
          example: 'สถิติย้อนหลัง...',
        },
        type: {
          type: 'string',
          description: 'ประเภท',
          example: 'statistic',
        },
        value: {
          type: 'string',
          description: 'ค่าข้อมูล',
          example: '95%',
        },
        prefix: {
          type: 'string',
          description: 'คำนำหน้า',
          example: 'กว่า',
        },
        suffix: {
          type: 'string',
          description: 'คำต่อท้าย',
          example: 'เปอร์เซ็นต์',
        },
        isActive: {
          type: 'boolean',
          description: 'เปิดใช้งาน',
          example: true,
        },
        image: {
          type: 'string',
          format: 'binary',
          description: 'รูปภาพประกอบ (ถ้าต้องการเปลี่ยน)',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: UpdateFeatureDto,
  ): Promise<Feature> {
    return this.service.update(id, dto, image);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.admin)
  @Delete(':id')
  @ApiOperation({ summary: 'ลบจุดเด่น' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
