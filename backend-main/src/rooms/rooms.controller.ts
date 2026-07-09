import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PaginatedRoomResponseDto } from './dto/paginated-room.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorators/public.decorator';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';

@ApiTags('Rooms (ห้องเรียน)')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'สร้างห้องเรียนใหม่' })
  @ApiResponse({ status: 201, type: CreateRoomDto })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการห้องเรียน (พร้อม Pagination)' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'ค้นหาชื่อห้อง',
    example: '301',
    type: String,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'เรียงลำดับ (field:ASC/DESC)',
    example: 'code:ASC',
    type: String,
  })
  @ApiResponse({
    status: 200,
    type: PaginatedRoomResponseDto,
    description: 'ดึงข้อมูลสำเร็จ',
  })
  findAll(@Paginate() query: PaginateQuery) {
    return this.roomsService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดห้องตาม ID' })
  @ApiResponse({ status: 200, type: CreateRoomDto })
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขข้อมูลห้องเรียน' })
  @ApiBody({ type: UpdateRoomDto })
  @ApiResponse({ status: 200, type: CreateRoomDto })
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @ApiBearerAuth()
  @Post(':id/image')
  @ApiOperation({ summary: 'อัปโหลดรูปภาพห้องเรียน' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  updateImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.roomsService.updateImage(id, file);
  }

  @ApiBearerAuth()
  @Delete(':id/image')
  @HttpCode(200)
  @ApiOperation({ summary: 'ลบรูปภาพห้องเรียน' })
  @ApiResponse({
    status: 200,
    description: 'ลบรูปสำเร็จ',
    schema: { example: { message: 'Image deleted successfully' } },
  })
  async deleteImage(@Param('id', ParseUUIDPipe) id: string) {
    return await this.roomsService.removeImage(id);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'ลบห้องเรียน' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}
