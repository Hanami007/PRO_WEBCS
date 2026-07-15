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
import { MisRepairRequestService } from './mis-repair-request.service';
import { CreateMisRepairRequestDto } from './dto/create-mis-repair-request.dto';
import { UpdateMisRepairRequestDto } from './dto/update-mis-repair-request.dto';

@ApiTags('MIS - Repair Request (ระบบแจ้งของพัง)')
@Controller('mis-repair-request')
export class MisRepairRequestController {
  constructor(private readonly service: MisRepairRequestService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'แจ้งของพัง (Public)' })
  @ApiResponse({ status: 201, description: 'แจ้งสำเร็จ' })
  create(@Body() dto: CreateMisRepairRequestDto) {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการแจ้งของพังทั้งหมด (Admin)' })
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
  @ApiOperation({ summary: 'อัพเดทสถานะ (Admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateMisRepairRequestDto) {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'ลบรายการ (Admin)' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
