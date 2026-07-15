import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { MisRepairRequest } from './entities/mis-repair-request.entity';
import { CreateMisRepairRequestDto } from './dto/create-mis-repair-request.dto';
import { UpdateMisRepairRequestDto } from './dto/update-mis-repair-request.dto';
import { FilesService } from 'src/files/files.service';
import { File } from 'src/files/entities/file.entity';

@Injectable()
export class MisRepairRequestService {
  constructor(
    @InjectRepository(MisRepairRequest)
    private readonly repository: Repository<MisRepairRequest>,
    private readonly filesService: FilesService,
  ) {}

  async create(dto: CreateMisRepairRequestDto): Promise<MisRepairRequest> {
    let image: File | null = null;
    if (dto.image) {
      const fileObject = await this.filesService.findById(dto.image.id);
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: { image: 'imageNotExists' },
        });
      }
      image = fileObject;
    }
    const record = this.repository.create({ ...dto, image });
    return this.repository.save(record);
  }

  findAll(query: PaginateQuery): Promise<Paginated<MisRepairRequest>> {
    return paginate(query, this.repository, {
      sortableColumns: ['id', 'reporterName', 'location', 'status', 'createdAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['reporterName', 'location', 'itemName', 'description'],
      filterableColumns: { status: true },
      relations: ['image'],
    });
  }

  findOne(id: string): Promise<MisRepairRequest | null> {
    return this.repository.findOne({ where: { id }, relations: ['image'] });
  }

  update(id: string, dto: UpdateMisRepairRequestDto) {
    return this.repository.update(id, dto);
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }
}
