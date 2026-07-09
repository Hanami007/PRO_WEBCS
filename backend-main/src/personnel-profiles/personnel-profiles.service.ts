import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonnelProfile } from './entities/personnel-profile.entity';
import { CreatePersonnelProfileDto } from './dto/create-personnel-profile.dto';
import { UpdatePersonnelProfileDto } from './dto/update-personnel-profile.dto';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Personnel } from 'src/personnel/entities/personnel.entity';

@Injectable()
export class PersonnelProfilesService {
  constructor(
    @InjectRepository(PersonnelProfile)
    private readonly repo: Repository<PersonnelProfile>,
    @InjectRepository(Personnel)
    private readonly personnelRepo: Repository<Personnel>,
  ) {}

  async findAll(query: PaginateQuery): Promise<Paginated<PersonnelProfile>> {
    return paginate(query, this.repo, {
      sortableColumns: ['id', 'createdAt', 'workplace'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['bio', 'workplace'],
      relations: ['personnel'],
    });
  }

  async findOne(id: string): Promise<PersonnelProfile> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['personnel'],
    });
    if (!entity) throw new NotFoundException('Personnel profile not found');
    return entity;
  }

  async findByPersonnelId(personnelId: string): Promise<PersonnelProfile> {
    const entity = await this.repo.findOne({
      where: { personnel: { id: personnelId } },
      relations: ['personnel'],
    });
    if (!entity) throw new NotFoundException('Personnel profile not found');
    return entity;
  }

  async create(dto: CreatePersonnelProfileDto): Promise<PersonnelProfile> {
    const personnel = await this.personnelRepo.findOne({
      where: { id: dto.personnelId },
    });

    if (!personnel) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          personnelId: 'personnelNotExists',
        },
      });
    }

    const existing = await this.repo.findOne({
      where: { personnel: { id: dto.personnelId } },
    });

    if (existing) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          personnelId: 'personnelProfileAlreadyExists',
        },
      });
    }

    const { ...rest } = dto;
    const entity = this.repo.create({
      ...rest,
      personnel,
    });

    return this.repo.save(entity);
  }

  async update(
    id: string,
    dto: UpdatePersonnelProfileDto,
  ): Promise<PersonnelProfile> {
    const entity = await this.findOne(id);
    return this.repo.save({ ...entity, ...dto });
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.repo.softRemove(entity);
  }
}
