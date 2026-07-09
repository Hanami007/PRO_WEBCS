import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SerializeOptions,
} from '@nestjs/common';
import { PersonnelService } from './personnel.service';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { UpdatePersonnelDto } from './dto/update-personnel.dto';
import { PaginatedPersonnelResponseDto } from './dto/paginated-personnel-response.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { Public } from 'src/auth/decorators/public.decorator';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Personnel (บุคลากร)')
@Controller('personnels')
export class PersonnelController {
  constructor(private readonly personnelService: PersonnelService) {}

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'เพิ่มบุคลากรใหม่' })
  @ApiResponse({ status: 201, type: CreatePersonnelDto })
  create(@Body() createPersonnelDto: CreatePersonnelDto) {
    return this.personnelService.create(createPersonnelDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'ดึงรายชื่อบุคลากร (พร้อม Pagination)' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'ค้นหาชื่อ',
    example: 'สมชาย',
    type: String,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'เรียงลำดับ (field:ASC/DESC)',
    example: 'fullnameTh:ASC',
    type: String,
  })
  @ApiResponse({
    status: 200,
    type: PaginatedPersonnelResponseDto,
    description: 'Returns a paginated list of personnel',
  })
  findAll(@Paginate() query: PaginateQuery) {
    return this.personnelService.findAll(query);
  }

  @SerializeOptions({ groups: ['admin'] })
  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดบุคลากรตาม ID' })
  @ApiResponse({ status: 200, type: CreatePersonnelDto })
  findOne(@Param('id') id: string) {
    return this.personnelService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขข้อมูลบุคลากร' })
  @ApiBody({ type: UpdatePersonnelDto })
  @ApiResponse({ status: 200, type: CreatePersonnelDto })
  update(
    @Param('id') id: string,
    @Body() updatePersonnelDto: UpdatePersonnelDto,
  ) {
    return this.personnelService.update(id, updatePersonnelDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'ลบบุคลากร' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  remove(@Param('id') id: string) {
    return this.personnelService.remove(id);
  }
}
