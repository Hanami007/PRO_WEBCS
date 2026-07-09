import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Personnel } from './entities/personnel.entity';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { UpdatePersonnelDto } from './dto/update-personnel.dto';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { PersonnelStatus } from 'src/personnel-status/entities/personnel-status.entity';
import { FilesService } from 'src/files/files.service';
import { File } from 'src/files/entities/file.entity';

@Injectable()
export class PersonnelService {
  constructor(
    @InjectRepository(Personnel)
    private readonly personnelRepository: Repository<Personnel>,
    @InjectRepository(PersonnelStatus)
    private readonly personnelStatusRepository: Repository<PersonnelStatus>,
    private readonly filesService: FilesService,
  ) {}

  async create(createPersonnelDto: CreatePersonnelDto): Promise<Personnel> {
    const { workStatusId, ...dto } = createPersonnelDto;

    const workStatus = await this.personnelStatusRepository.findOne({
      where: { id: workStatusId },
    });

    if (!workStatus) {
      throw new NotFoundException(
        `PersonnelStatus with ID ${workStatusId} not found`,
      );
    }

    const personnel = this.personnelRepository.create({
      ...dto,
      workStatus,
    });

    return this.personnelRepository.save(personnel);
  }

  findAll(query: PaginateQuery): Promise<Paginated<Personnel>> {
    return paginate(query, this.personnelRepository, {
      sortableColumns: ['id', 'fullnameTh', 'fullnameEn'],
      relations: ['profileImage', 'workStatus', 'profile'],
      searchableColumns: ['fullnameTh', 'fullnameEn', 'email'],
      filterableColumns: {
        'workStatus.name': true,
        'profile.isPublic': true,
      },
      defaultSortBy: [['id', 'DESC']],
    });
  }

  async findOne(id: string): Promise<Personnel> {
    const personnel = await this.personnelRepository.findOne({
      where: { id },
      relations: ['profileImage', 'workStatus', 'profile'],
    });

    if (!personnel) {
      throw new NotFoundException(`Personnel with ID ${id} not found`);
    }

    return personnel;
  }

  async update(
    id: string,
    updatePersonnelDto: UpdatePersonnelDto,
  ): Promise<Personnel> {
    const {
      workStatusId,
      profileImage: profileImageDto,
      ...dto
    } = updatePersonnelDto;

    let profileImage: File | null | undefined = undefined;

    if (profileImageDto?.id) {
      const fileObject = await this.filesService.findById(profileImageDto.id);

      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            profileImage: 'imageNotExists',
          },
        });
      }

      profileImage = fileObject;
    } else if (profileImageDto === null) {
      profileImage = null;
    }

    const personnel = await this.personnelRepository.preload({
      id,
      ...dto,
      profileImage,
    });

    if (!personnel) {
      throw new NotFoundException(`Personnel with ID ${id} not found`);
    }

    if (workStatusId) {
      const workStatus = await this.personnelStatusRepository.findOne({
        where: { id: workStatusId },
      });

      if (!workStatus) {
        throw new NotFoundException(
          `PersonnelStatus with ID ${workStatusId} not found`,
        );
      }
      personnel.workStatus = workStatus;
    }

    return this.personnelRepository.save(personnel);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.personnelRepository.softDelete(id);
  }
}
