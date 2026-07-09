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
import { CarouselsService } from './carousels.service';
import { Public } from '../auth/decorators/public.decorator';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { CreateCarouselDto } from './dto/create-carousel.dto';
import { UpdateCarouselDto } from './dto/update-carousel.dto';
import { PaginatedCarouselResponseDto } from './dto/paginated-carousel.dto';
import { Carousel } from './entities/carousel.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Carousels (ภาพสไลด์/แบนเนอร์)')
@Controller('carousels')
export class CarouselsController {
  constructor(private readonly service: CarouselsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการแบนเนอร์ทั้งหมด (พร้อม Pagination)' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'ค้นหาหัวข้อ',
    example: 'ยินดีต้อนรับ',
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
    type: PaginatedCarouselResponseDto,
    description: 'ดึงข้อมูลสำเร็จ',
  })
  async list(@Paginate() query: PaginateQuery): Promise<Paginated<Carousel>> {
    return this.service.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดแบนเนอร์ตาม ID' })
  @ApiResponse({ status: 200, type: CreateCarouselDto })
  async getOne(@Param('id') id: string): Promise<Carousel> {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'สร้างแบนเนอร์ใหม่' })
  @ApiResponse({
    status: 201,
    description: 'สร้างสำเร็จ',
    type: CreateCarouselDto,
  })
  async create(@Body() dto: CreateCarouselDto): Promise<Carousel> {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขแบนเนอร์' })
  @ApiBody({ type: UpdateCarouselDto })
  @ApiResponse({
    status: 200,
    description: 'แก้ไขสำเร็จ',
    type: CreateCarouselDto,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCarouselDto,
  ): Promise<Carousel> {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'ลบแบนเนอร์' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.remove(id);
  }
}
