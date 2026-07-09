import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

import {
  ApiBearerAuth,
  ApiConsumes,
  ApiParam,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { FilesService } from './files.service';
import { File } from './entities/file.entity';
import { FileDto } from './dto/file.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Files (จัดการไฟล์)')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload/:prefix')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'อัปโหลดไฟล์ (ระบุ Folder ปลายทาง)' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'prefix',
    type: 'string',
    description: 'โฟลเดอร์ปลายทาง (เช่น personnel, users, documents)',
    example: 'personnel',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          description: 'ไฟล์ที่อัปโหลด',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'อัปโหลดสำเร็จ',
    type: FileDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('prefix') prefix: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<File> {
    return this.filesService.create(file);
  }

  @Post('upload/public/:prefix')
  @Public()
  @ApiOperation({ summary: 'อัปโหลดไฟล์ (ระบุ Folder ปลายทาง)' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'prefix',
    type: 'string',
    description: 'โฟลเดอร์ปลายทาง (เช่น personnel, users, documents)',
    example: 'personnel',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          description: 'ไฟล์ที่อัปโหลด',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'อัปโหลดสำเร็จ',
    type: FileDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFilePublic(
    @Param('prefix') prefix: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<File> {
    return this.filesService.create(file);
  }

  @Get(':id')
  @ApiOperation({ summary: 'ดึงข้อมูลไฟล์ตาม ID' })
  @ApiResponse({ status: 200, description: 'ข้อมูลไฟล์', type: FileDto })
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<File> {
    return this.filesService.findById(id);
  }
}
