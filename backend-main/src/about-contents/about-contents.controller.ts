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
import { AboutContentsService } from './about-contents.service';
import { CreateAboutContentDto } from './dto/create-about-content.dto';
import { UpdateAboutContentDto } from './dto/update-about-content.dto';
import { PaginatedAboutContentResponseDto } from './dto/paginated-about-content.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { RoleEnum } from '../roles/roles.enum';
import { AboutContent } from './entities/about-content.entity';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('About Contents (เนื้อหาหน้าเกี่ยวกับเรา)')
@Controller('about-contents')
export class AboutContentsController {
  constructor(private readonly service: AboutContentsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการเนื้อหาทั้งหมด (พร้อม Pagination)' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'ค้นหาจากชื่อหรือเนื้อหา',
    example: 'ประวัติ',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'ดึงข้อมูลสำเร็จ',
    type: PaginatedAboutContentResponseDto,
  })
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<AboutContent>> {
    return this.service.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดเนื้อหาตาม ID' })
  @ApiResponse({ status: 200, type: CreateAboutContentDto })
  async findOne(@Param('id') id: string): Promise<AboutContent> {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.admin)
  @Post()
  @ApiOperation({ summary: 'สร้างเนื้อหาใหม่' })
  @ApiResponse({
    status: 201,
    description: 'สร้างสำเร็จ',
    type: CreateAboutContentDto,
  })
  async create(@Body() dto: CreateAboutContentDto): Promise<AboutContent> {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.admin)
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขเนื้อหา' })
  @ApiBody({ type: UpdateAboutContentDto })
  @ApiResponse({
    status: 200,
    description: 'อัปเดตสำเร็จ',
    type: CreateAboutContentDto,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAboutContentDto,
  ): Promise<AboutContent | null> {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.admin)
  @Delete(':id')
  @ApiOperation({ summary: 'ลบเนื้อหา' })
  @ApiResponse({
    status: 200,
    description: 'ลบข้อมูลสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
