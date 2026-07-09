import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PersonnelStatusService } from './personnel-status.service';
import { CreatePersonnelStatusDto } from './dto/create-personnel-status.dto';
import { UpdatePersonnelStatusDto } from './dto/update-personnel-status.dto';
import { Public } from 'src/auth/decorators/public.decorator';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Personnel Status (สถานะบุคลากร)')
@Controller('personnel-status')
export class PersonnelStatusController {
  constructor(
    private readonly personnelStatusService: PersonnelStatusService,
  ) {}

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'สร้างสถานะใหม่ (เช่น ลาศึกษาต่อ)' })
  @ApiResponse({
    status: 201,
    description: 'สร้างสำเร็จ',
    type: CreatePersonnelStatusDto,
  })
  create(@Body() createPersonnelStatusDto: CreatePersonnelStatusDto) {
    return this.personnelStatusService.create(createPersonnelStatusDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการสถานะทั้งหมด' })
  @ApiResponse({
    status: 200,
    description: 'ดึงข้อมูลสำเร็จ',
    type: CreatePersonnelStatusDto,
    isArray: true,
  })
  findAll() {
    return this.personnelStatusService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดสถานะตาม ID' })
  @ApiResponse({
    status: 200,
    description: 'เจอข้อมูล',
    type: CreatePersonnelStatusDto,
  })
  @ApiResponse({ status: 404, description: 'ไม่พบข้อมูล' })
  findOne(@Param('id') id: string) {
    return this.personnelStatusService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขสถานะ' })
  @ApiBody({ type: UpdatePersonnelStatusDto })
  @ApiResponse({
    status: 200,
    description: 'แก้ไขสำเร็จ',
    type: CreatePersonnelStatusDto,
  })
  update(
    @Param('id') id: string,
    @Body() updatePersonnelStatusDto: UpdatePersonnelStatusDto,
  ) {
    return this.personnelStatusService.update(id, updatePersonnelStatusDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'ลบสถานะ' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  remove(@Param('id') id: string) {
    return this.personnelStatusService.remove(id);
  }
}
