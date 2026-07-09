import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlumnisService } from './alumnis.service';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';
import { PaginatedAlumniResponseDto } from './dto/paginated-alumni.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { Public } from 'src/auth/decorators/public.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Alumnis (ศิษย์เก่า)')
@Controller('alumnis')
export class AlumnisController {
  constructor(private readonly alumnisService: AlumnisService) {}

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'เพิ่มข้อมูลศิษย์เก่าใหม่' })
  @ApiResponse({
    status: 201,
    description: 'บันทึกสำเร็จ',
    type: CreateAlumniDto,
  })
  create(@Body() createAlumniDto: CreateAlumniDto) {
    return this.alumnisService.create(createAlumniDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการศิษย์เก่าทั้งหมด (พร้อม Pagination)' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'ค้นหาชื่อหรือรุ่น',
    example: 'CS25',
    type: String,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'เรียงลำดับ (field:ASC/DESC)',
    example: 'cohort:DESC',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'ดึงข้อมูลสำเร็จ',
    type: PaginatedAlumniResponseDto,
  })
  findAll(@Paginate() query: PaginateQuery) {
    return this.alumnisService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดศิษย์เก่าตาม ID' })
  @ApiResponse({ status: 200, type: CreateAlumniDto })
  findOne(@Param('id') id: string) {
    return this.alumnisService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขข้อมูลศิษย์เก่า' })
  @ApiBody({ type: UpdateAlumniDto })
  @ApiResponse({ status: 200, type: CreateAlumniDto })
  update(@Param('id') id: string, @Body() updateAlumniDto: UpdateAlumniDto) {
    return this.alumnisService.update(id, updateAlumniDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'ลบข้อมูลศิษย์เก่า' })
  @ApiResponse({
    status: 200,
    description: 'ลบข้อมูลสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  remove(@Param('id') id: string) {
    return this.alumnisService.remove(id);
  }
}
