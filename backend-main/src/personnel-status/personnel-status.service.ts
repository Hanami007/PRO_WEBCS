import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonnelStatusDto } from './dto/create-personnel-status.dto';
import { UpdatePersonnelStatusDto } from './dto/update-personnel-status.dto';
import { PersonnelStatus } from './entities/personnel-status.entity';

@Injectable()
export class PersonnelStatusService {
  constructor(
    @InjectRepository(PersonnelStatus)
    private readonly personnelStatusRepository: Repository<PersonnelStatus>,
  ) {}

  async create(createPersonnelStatusDto: CreatePersonnelStatusDto) {
    const status = this.personnelStatusRepository.create(
      createPersonnelStatusDto,
    );
    return await this.personnelStatusRepository.save(status);
  }

  async findAll() {
    return await this.personnelStatusRepository.find();
  }

  async findOne(id: string) {
    const status = await this.personnelStatusRepository.findOne({
      where: { id },
    });

    if (!status) {
      throw new NotFoundException(`Personnel Status with ID ${id} not found`);
    }

    return status;
  }

  async update(id: string, updatePersonnelStatusDto: UpdatePersonnelStatusDto) {
    const status = await this.findOne(id);

    this.personnelStatusRepository.merge(status, updatePersonnelStatusDto);
    return await this.personnelStatusRepository.save(status);
  }

  async remove(id: string) {
    const status = await this.findOne(id);
    return await this.personnelStatusRepository.remove(status);
  }
}
