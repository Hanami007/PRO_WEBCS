import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { ArticleImagesService } from 'src/article-images/article-images.service';
import { ArticleImage } from 'src/article-images/entities/article-image.entity';
import { Public } from 'src/auth/decorators/public.decorator';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { ArticleDto } from './dto/article.dto';
import { PaginatedArticleResponseDto } from './dto/paginated-article.dto';

@ApiTags('Articles (ข่าวสาร)')
@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly articleImagesService: ArticleImagesService,
  ) {}

  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'สร้างข่าวสารใหม่' })
  @ApiResponse({ status: 201, description: 'สร้างสำเร็จ', type: ArticleDto })
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articlesService.create(createArticleDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'ดึงรายการข่าวสาร (พร้อม Pagination)' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'เลขหน้า',
    example: 1,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'จำนวนต่อหน้า',
    example: 10,
    type: Number,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'ค้นหา',
    example: 'รับสมัคร',
    type: String,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'เรียงลำดับ (field:ASC/DESC)',
    example: 'createdAt:DESC',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'ดึงข้อมูลสำเร็จ',
    type: PaginatedArticleResponseDto,
  })
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Article>> {
    return await this.articlesService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'ดูรายละเอียดข่าวสารตาม ID' })
  @ApiResponse({ status: 200, description: 'เจอข้อมูล', type: ArticleDto })
  @ApiResponse({ status: 404, description: 'ไม่พบข้อมูล' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Article | null> {
    return await this.articlesService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'แก้ไขข่าวสาร' })
  @ApiBody({ type: UpdateArticleDto })
  @ApiResponse({ status: 200, description: 'แก้ไขสำเร็จ', type: ArticleDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article | null> {
    return await this.articlesService.update(id, updateArticleDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'ลบข่าวสาร' })
  @ApiResponse({
    status: 200,
    description: 'ลบสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.articlesService.remove(id);
  }

  @ApiBearerAuth()
  @Post(':id/images')
  @ApiOperation({ summary: 'อัปโหลดรูปภาพประกอบข่าว' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async createImage(
    @Param('id', ParseUUIDPipe) articleId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ArticleImage | null> {
    return await this.articlesService.createImage(articleId, file);
  }

  @ApiBearerAuth()
  @Delete('images/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'ลบรูปภาพประกอบ' })
  @ApiResponse({
    status: 200,
    description: 'ลบรูปสำเร็จ',
    schema: { example: { message: 'Deleted successfully' } },
  })
  async deleteImage(@Param('id', ParseUUIDPipe) id: string) {
    return await this.articleImagesService.remove(id);
  }

  @ApiBearerAuth()
  @Delete(':id/thumbnail')
  @HttpCode(200)
  @ApiOperation({ summary: 'ลบรูปหน้าปก (Thumbnail)' })
  @ApiResponse({
    status: 200,
    description: 'ลบหน้าปกสำเร็จ',
    schema: { example: { message: 'Thumbnail deleted successfully' } },
  })
  async deleteThumbnail(@Param('id', ParseUUIDPipe) id: string) {
    return await this.articlesService.removeThumbnail(id);
  }
}
