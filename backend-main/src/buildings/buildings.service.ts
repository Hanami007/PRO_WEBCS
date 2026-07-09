import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './entities/building.entity';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { FilesService } from 'src/files/files.service';
import { File } from 'src/files/entities/file.entity';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>,
    private readonly filesService: FilesService,
  ) {}

  async create(createBuildingDto: CreateBuildingDto): Promise<Building> {
    const building = this.buildingRepository.create(createBuildingDto);
    return this.buildingRepository.save(building);
  }

  findAll(query: PaginateQuery): Promise<Paginated<Building>> {
    return paginate(query, this.buildingRepository, {
      sortableColumns: ['id', 'name'],
      relations: ['image'],
      searchableColumns: ['name'],
      defaultSortBy: [['id', 'DESC']],
    });
  }

  async findOne(id: string): Promise<Building> {
    const building = await this.buildingRepository.findOne({
      where: { id },
      relations: ['image'],
    });

    if (!building) {
      throw new NotFoundException(`Building with ID ${id} not found`);
    }

    return building;
  }

  async update(
    id: string,
    updateBuildingDto: UpdateBuildingDto,
  ): Promise<Building> {
    const { image: imageDto, ...dto } = updateBuildingDto;

    let image: File | null | undefined = undefined;

    if (imageDto?.id) {
      const fileObject = await this.filesService.findById(imageDto.id);

      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            image: 'imageNotExists',
          },
        });
      }

      image = fileObject;
    } else if (imageDto === null) {
      image = null;
    }

    const building = await this.buildingRepository.preload({
      id,
      ...dto,
      image,
    });

    if (!building) {
      throw new NotFoundException(`Building with ID ${id} not found`);
    }

    return this.buildingRepository.save(building);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.buildingRepository.softDelete(id);
  }
}
