import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomTypeService } from './room-type.service';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Room Types (ประเภทห้องเรียน)')
@Controller('room-type')
export class RoomTypeController {
  constructor(private readonly roomTypeService: RoomTypeService) {}

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'สร้างประเภทห้องใหม่' })
  @ApiResponse({ status: 201, type: CreateRoomTypeDto })
  create(@Body() createRoomTypeDto: CreateRoomTypeDto) {
    return this.roomTypeService.create(createRoomTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'ดึงรายการประเภทห้องทั้งหมด' })
  @ApiResponse({ status: 200, type: CreateRoomTypeDto, isArray: true })
  findAll() {
    return this.roomTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดประเภทห้องตาม ID' })
  @ApiResponse({ status: 200, type: CreateRoomTypeDto })
  findOne(@Param('id') id: string) {
    return this.roomTypeService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขประเภทห้อง' })
  @ApiBody({ type: UpdateRoomTypeDto })
  @ApiResponse({ status: 200, type: CreateRoomTypeDto })
  update(
    @Param('id') id: string,
    @Body() updateRoomTypeDto: UpdateRoomTypeDto,
  ) {
    return this.roomTypeService.update(id, updateRoomTypeDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'ลบประเภทห้อง' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  remove(@Param('id') id: string) {
    return this.roomTypeService.remove(id);
  }
}
