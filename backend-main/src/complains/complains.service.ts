import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateComplainDto } from './dto/create-complain.dto';
import { UpdateComplainDto } from './dto/update-complain.dto';
import { Complain } from './entities/complain.entity';
import { FilesService } from 'src/files/files.service';
import { File } from 'src/files/entities/file.entity';

import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class ComplainsService {
  constructor(
    @InjectRepository(Complain)
    private readonly complainRepository: Repository<Complain>,
    private readonly filesService: FilesService,
  ) {}
  async create(createComplainDto: CreateComplainDto): Promise<Complain> {
    let image: File | null = null;
    if (createComplainDto.image) {
      const fileObject = await this.filesService.findById(
        createComplainDto.image.id,
      );

      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            image: 'imageNotExists',
          },
        });
      }
      image = fileObject;
    }

    const complain = this.complainRepository.create({
      ...createComplainDto,
      image,
    });
    return await this.complainRepository.save(complain);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Complain>> {
    return paginate(query, this.complainRepository, {
      sortableColumns: ['id', 'title', 'createdAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['title', 'detail'],
      relations: ['image'],
    });
  }

  findOne(id: string) {
    return this.complainRepository.findOne({
      where: { id },
      relations: ['image'],
    });
  }

  update(id: string, updateComplainDto: UpdateComplainDto) {
    return this.complainRepository.update(id, updateComplainDto);
  }

  remove(id: string) {
    return this.complainRepository.delete(id);
  }
}
