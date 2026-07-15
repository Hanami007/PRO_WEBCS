import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { MisEquipmentBorrow } from './entities/mis-equipment-borrow.entity';
import { CreateMisEquipmentBorrowDto } from './dto/create-mis-equipment-borrow.dto';
import { UpdateMisEquipmentBorrowDto } from './dto/update-mis-equipment-borrow.dto';

@Injectable()
export class MisEquipmentBorrowService {
  constructor(
    @InjectRepository(MisEquipmentBorrow)
    private readonly repository: Repository<MisEquipmentBorrow>,
  ) {}

  create(dto: CreateMisEquipmentBorrowDto): Promise<MisEquipmentBorrow> {
    const record = this.repository.create(dto);
    return this.repository.save(record);
  }

  findAll(query: PaginateQuery): Promise<Paginated<MisEquipmentBorrow>> {
    return paginate(query, this.repository, {
      sortableColumns: ['id', 'borrowerName', 'equipmentName', 'status', 'borrowDate', 'returnDate', 'createdAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['borrowerName', 'equipmentName', 'note'],
      filterableColumns: { status: true },
    });
  }

  findOne(id: string): Promise<MisEquipmentBorrow | null> {
    return this.repository.findOne({ where: { id } });
  }

  update(id: string, dto: UpdateMisEquipmentBorrowDto) {
    return this.repository.update(id, dto);
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }
}
