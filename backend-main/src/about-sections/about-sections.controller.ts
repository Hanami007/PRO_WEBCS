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
import { AboutSectionsService } from './about-sections.service';
import { CreateAboutSectionDto } from './dto/create-about-section.dto';
import { UpdateAboutSectionDto } from './dto/update-about-section.dto';
import { PaginatedAboutSectionResponseDto } from './dto/paginated-about-section.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { RoleEnum } from '../roles/roles.enum';
import { AboutSection } from './entities/about-section.entity';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('About Sections (หมวดหมู่หน้าเกี่ยวกับเรา)')
@Controller('about-sections')
export class AboutSectionsController {
  constructor(private readonly service: AboutSectionsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการหมวดหมู่ทั้งหมด (พร้อม Pagination)' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'ค้นหาชื่อหมวดหมู่',
    example: 'ข้อมูลทั่วไป',
    type: String,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'เรียงลำดับ (field:ASC/DESC)',
    example: 'sortOrder:ASC',
    type: String,
  })
  @ApiResponse({
    status: 200,
    type: PaginatedAboutSectionResponseDto,
    description: 'ดึงข้อมูลสำเร็จ',
  })
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<AboutSection>> {
    return this.service.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดหมวดหมู่ตาม ID' })
  @ApiResponse({ status: 200, type: CreateAboutSectionDto })
  async findOne(@Param('id') id: string): Promise<AboutSection | null> {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.admin)
  @Post()
  @ApiOperation({ summary: 'สร้างหมวดหมู่ใหม่' })
  @ApiResponse({ status: 201, type: CreateAboutSectionDto })
  async create(@Body() dto: CreateAboutSectionDto): Promise<AboutSection> {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.admin)
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขหมวดหมู่' })
  @ApiBody({ type: UpdateAboutSectionDto })
  @ApiResponse({ status: 200, type: CreateAboutSectionDto })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAboutSectionDto,
  ): Promise<AboutSection | null> {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.admin)
  @Delete(':id')
  @ApiOperation({ summary: 'ลบหมวดหมู่' })
  @ApiResponse({
    status: 200,
    description: 'ลบข้อมูลสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
