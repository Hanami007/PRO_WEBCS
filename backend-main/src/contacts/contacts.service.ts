import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import {
  paginate,
  Paginated,
  PaginateQuery,
  FilterOperator,
} from 'nestjs-paginate';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>,
  ) {}

  async findAll(query: PaginateQuery): Promise<Paginated<Contact>> {
    return paginate(query, this.contactRepo, {
      sortableColumns: ['createdAt'],
      defaultSortBy: [['createdAt', 'ASC']],
      filterableColumns: {
        isActive: [FilterOperator.EQ],
      },
    });
  }

  async findOne(id: string): Promise<Contact> {
    const found = await this.contactRepo.findOne({ where: { id } });
    if (!found) throw new NotFoundException('Contact block not found');
    return found;
  }

  async create(dto: CreateContactDto): Promise<Contact> {
    const entity = this.contactRepo.create({
      ...dto,
    });
    return this.contactRepo.save(entity);
  }

  async update(id: string, dto: UpdateContactDto): Promise<Contact> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.contactRepo.save(entity);
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.contactRepo.softRemove(entity);
  }
}
