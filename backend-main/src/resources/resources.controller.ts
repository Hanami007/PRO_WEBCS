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
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourceResponseDto } from './dto/resource-response.dto';
import { PaginatedResourceResponseDto } from './dto/paginated-resource-response.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';

@ApiTags('Resources')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all resources (Paginated)' })
  @ApiQuery({ name: 'page', required: false, example: 1, type: Number })
  @ApiQuery({ name: 'limit', required: false, example: 10, type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    type: PaginatedResourceResponseDto,
    description: 'Returns a paginated list of resources',
  })
  findAll(@Paginate() query: PaginateQuery) {
    return this.resourcesService.findAll(query);
  }

  @Public()
  @Get('key/:key')
  @ApiOperation({ summary: 'Get a resource by its key' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResourceResponseDto,
    description: 'Returns a single resource by its key',
  })
  findByKey(@Param('key') key: string) {
    return this.resourcesService.findByKey(key);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a resource by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResourceResponseDto,
    description: 'Returns a single resource by its ID',
  })
  findOne(@Param('id') id: string) {
    return this.resourcesService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.admin)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new resource' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ResourceResponseDto,
    description: 'The resource has been successfully created.',
  })
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.create(createResourceDto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.admin)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a resource' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResourceResponseDto,
    description: 'The resource has been successfully updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.resourcesService.update(id, updateResourceDto);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.admin)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a resource' })
  remove(@Param('id') id: string) {
    return this.resourcesService.remove(id);
  }
}
