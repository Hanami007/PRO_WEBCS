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
import { MisEquipmentBorrowService } from './mis-equipment-borrow.service';
import { CreateMisEquipmentBorrowDto } from './dto/create-mis-equipment-borrow.dto';
import { UpdateMisEquipmentBorrowDto } from './dto/update-mis-equipment-borrow.dto';

@ApiTags('MIS - Equipment Borrow (ระบบยืม-คืนครุภัณฑ์)')
@Controller('mis-equipment-borrow')
export class MisEquipmentBorrowController {
  constructor(private readonly service: MisEquipmentBorrowService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'ส่งคำขอยืมครุภัณฑ์ (Public)' })
  @ApiResponse({ status: 201, description: 'บันทึกสำเร็จ' })
  create(@Body() dto: CreateMisEquipmentBorrowDto) {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการยืม-คืนทั้งหมด (Admin)' })
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
  @ApiOperation({ summary: 'อัพเดทสถานะการคืน (Admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateMisEquipmentBorrowDto) {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'ลบรายการ (Admin)' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
