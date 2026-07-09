import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Public } from '../auth/decorators/public.decorator';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PaginatedContactResponseDto } from './dto/paginated-contact.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Contacts (ช่องทางติดต่อ)')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly service: ContactsService) {}

  /* -------------------- PUBLIC -------------------- */

  @Public()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการช่องทางติดต่อ (พร้อม Pagination)' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'ค้นหา',
    example: 'Facebook',
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
    type: PaginatedContactResponseDto,
    description: 'ดึงข้อมูลสำเร็จ',
  })
  async list(@Paginate() query: PaginateQuery): Promise<Paginated<Contact>> {
    return this.service.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดช่องทางติดต่อตาม ID' })
  @ApiResponse({ status: 200, type: CreateContactDto })
  async getOne(@Param('id') id: string): Promise<Contact> {
    return this.service.findOne(id);
  }

  /* -------------------- ADMIN ONLY -------------------- */

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'เพิ่มช่องทางติดต่อใหม่' })
  @ApiResponse({ status: 201, type: CreateContactDto })
  async create(@Body() dto: CreateContactDto): Promise<Contact> {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขช่องทางติดต่อ' })
  @ApiBody({ type: UpdateContactDto })
  @ApiResponse({ status: 200, type: CreateContactDto })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateContactDto,
  ): Promise<Contact> {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'ลบช่องทางติดต่อ' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
