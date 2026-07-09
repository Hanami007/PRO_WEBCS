import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { PaginatedProgramResponseDto } from './dto/paginated-program.dto';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { Program } from './entities/program.entity';
import { Public } from 'src/auth/decorators/public.decorator';
import { Paginate } from 'nestjs-paginate';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Programs (หลักสูตร)')
@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'สร้างหลักสูตรใหม่' })
  @ApiResponse({ status: 201, type: CreateProgramDto })
  create(@Body() createProgramDto: CreateProgramDto): Promise<Program> {
    return this.programsService.create(createProgramDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการหลักสูตรทั้งหมด' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'ค้นหาชื่อหลักสูตร',
    example: 'วิทยาการคอมพิวเตอร์',
    type: String,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'เรียงลำดับ (field:ASC/DESC)',
    example: 'code:DESC',
    type: String,
  })
  @ApiResponse({
    status: 200,
    type: PaginatedProgramResponseDto,
    description: 'ดึงข้อมูลสำเร็จ',
  })
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Program>> {
    return this.programsService.findAll(query);
  }

  @Public()
  @Get('current')
  @ApiOperation({ summary: 'ดึงหลักสูตรปัจจุบัน (Active)' })
  @ApiResponse({ status: 200, type: CreateProgramDto })
  findCurrent(): Promise<Program> {
    return this.programsService.findCurrent();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดหลักสูตรตาม ID' })
  @ApiResponse({ status: 200, type: CreateProgramDto })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Program> {
    return this.programsService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขหลักสูตร' })
  @ApiBody({ type: UpdateProgramDto })
  @ApiResponse({ status: 200, type: CreateProgramDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProgramDto: UpdateProgramDto,
  ): Promise<Program> {
    return this.programsService.update(id, updateProgramDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'ลบหลักสูตร' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.programsService.remove(id);
  }
}
