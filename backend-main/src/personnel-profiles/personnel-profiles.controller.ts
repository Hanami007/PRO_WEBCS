import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PersonnelProfilesService } from './personnel-profiles.service';
import { CreatePersonnelProfileDto } from './dto/create-personnel-profile.dto';
import { UpdatePersonnelProfileDto } from './dto/update-personnel-profile.dto';
import { PersonnelProfile } from './entities/personnel-profile.entity';
import { PaginatedPersonnelProfileResponseDto } from './dto/paginated-personnel-profile.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';

@ApiTags('Personnel Profiles (ข้อมูลโปรไฟล์บุคลากร)')
@Controller('personnel-profiles')
export class PersonnelProfilesController {
  constructor(private readonly service: PersonnelProfilesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการโปรไฟล์ทั้งหมด (Pagination)' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiResponse({
    status: 200,
    type: PaginatedPersonnelProfileResponseDto,
    description: 'ดึงข้อมูลสำเร็จ',
  })
  findAll(@Paginate() query: PaginateQuery) {
    return this.service.findAll(query);
  }

  @Public()
  @Get('personnel/:id')
  @ApiOperation({ summary: 'ดูรายละเอียดโปรไฟล์ตาม Personnel ID' })
  @ApiResponse({ status: 200, type: PersonnelProfile })
  findByPersonnelId(@Param('id') id: string) {
    return this.service.findByPersonnelId(id);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดโปรไฟล์ตาม ID' })
  @ApiResponse({ status: 200, type: PersonnelProfile })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.admin)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'สร้างโปรไฟล์บุคลากรใหม่' })
  @ApiResponse({ status: 201, type: PersonnelProfile })
  create(@Body() dto: CreatePersonnelProfileDto) {
    return this.service.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.admin)
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขโปรไฟล์บุคลากร' })
  @ApiResponse({ status: 200, type: PersonnelProfile })
  update(@Param('id') id: string, @Body() dto: UpdatePersonnelProfileDto) {
    return this.service.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.admin)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'ลบโปรไฟล์บุคลากร' })
  @ApiResponse({ status: 204, description: 'ลบสำเร็จ' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
