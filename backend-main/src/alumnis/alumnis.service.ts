import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alumni } from './entities/alumni.entity';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { FilesService } from 'src/files/files.service';
import { File } from 'src/files/entities/file.entity';

@Injectable()
export class AlumnisService {
  constructor(
    @InjectRepository(Alumni)
    private readonly alumniRepository: Repository<Alumni>,
    private readonly filesService: FilesService,
  ) {}

  create(createAlumniDto: CreateAlumniDto): Promise<Alumni> {
    const alumni = this.alumniRepository.create(createAlumniDto);
    return this.alumniRepository.save(alumni);
  }

  findAll(query: PaginateQuery): Promise<Paginated<Alumni>> {
    return paginate(query, this.alumniRepository, {
      sortableColumns: ['id', 'createdAt'],
      relations: ['profileImage'],
      searchableColumns: ['fullName', 'cohort', 'workplace'],
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: string): Promise<Alumni> {
    const alumni = await this.alumniRepository.findOne({
      where: { id },
      relations: ['profileImage'],
    });

    if (!alumni) {
      throw new NotFoundException(`Alumni with ID ${id} not found`);
    }

    return alumni;
  }

  async update(id: string, updateAlumniDto: UpdateAlumniDto): Promise<Alumni> {
    const { profileImage: profileImageDto, ...dto } = updateAlumniDto;

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

    const alumni = await this.alumniRepository.preload({
      id,
      ...dto,
      profileImage,
    });

    if (!alumni) {
      throw new NotFoundException(`Alumni with ID ${id} not found`);
    }

    return this.alumniRepository.save(alumni);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.alumniRepository.softDelete(id);
  }
}
