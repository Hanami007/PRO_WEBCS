import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { User } from '../users/user.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async findOne(options: { id: string }): Promise<Session | null> {
    return this.sessionRepository.findOne({
      where: {
        id: options.id,
      },
      relations: ['user'],
    });
  }

  async findMany(options: { user: { id: string } }): Promise<Session[]> {
    return this.sessionRepository.find({
      where: {
        user: {
          id: options.user.id,
        },
      },
    });
  }

  async create(data: {
    user: User;
    hash: string;
    ip?: string;
    userAgent?: string;
  }): Promise<Session> {
    return this.sessionRepository.save(this.sessionRepository.create(data));
  }

  async softDelete(criteria: {
    id?: string;
    user?: { id: string };
    excludeId?: string;
  }): Promise<void> {
    const { id, user, excludeId } = criteria;
    const query = this.sessionRepository
      .createQueryBuilder()
      .softDelete()
      .where('deletedAt IS NULL');

    if (id) {
      query.andWhere('id = :id', { id });
    }

    if (user?.id) {
      query.andWhere('userId = :userId', { userId: user.id });
    }

    if (excludeId) {
      query.andWhere('id != :excludeId', { excludeId });
    }

    await query.execute();
  }
}
