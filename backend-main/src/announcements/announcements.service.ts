import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  LessThanOrEqual,
  MoreThanOrEqual,
  IsNull,
} from 'typeorm';
import {
  Announcement,
  AnnouncementStatus,
} from './entities/announcement.entity';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import {
  paginate,
  Paginated,
  PaginateQuery,
  FilterOperator,
} from 'nestjs-paginate';
import { User } from '../users/user.entity';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementRepo: Repository<Announcement>,
  ) {}

  async findAll(query: PaginateQuery): Promise<Paginated<Announcement>> {
    return paginate(query, this.announcementRepo, {
      sortableColumns: ['createdAt', 'publishedAt', 'expiresAt', 'title'],
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['title', 'description'],
      filterableColumns: {
        status: [FilterOperator.EQ, FilterOperator.IN],
        type: [FilterOperator.EQ, FilterOperator.IN],
        expiresAt: [
          FilterOperator.EQ,
          FilterOperator.GT,
          FilterOperator.GTE,
          FilterOperator.LT,
          FilterOperator.LTE,
          FilterOperator.NULL,
        ],
        publishedAt: [
          FilterOperator.EQ,
          FilterOperator.GT,
          FilterOperator.GTE,
          FilterOperator.LT,
          FilterOperator.LTE,
          FilterOperator.NULL,
        ],
      },
    });
  }

  async findActive(): Promise<Announcement[]> {
    const now = new Date();
    return this.announcementRepo.find({
      where: [
        {
          status: AnnouncementStatus.PUBLISHED,
          publishedAt: LessThanOrEqual(now),
          expiresAt: MoreThanOrEqual(now),
        },
        {
          status: AnnouncementStatus.PUBLISHED,
          publishedAt: LessThanOrEqual(now),
          expiresAt: IsNull(),
        },
      ],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Announcement> {
    const found = await this.announcementRepo.findOne({
      where: { id },
      relations: ['creator'],
    });
    if (!found) throw new NotFoundException('Announcement not found');
    return found;
  }

  async create(
    dto: CreateAnnouncementDto,
    creator: User,
  ): Promise<Announcement> {
    const entity = this.announcementRepo.create({
      ...dto,
      creator,
    });
    return this.announcementRepo.save(entity);
  }

  async update(id: string, dto: UpdateAnnouncementDto): Promise<Announcement> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.announcementRepo.save(entity);
  }

  async remove(id: string): Promise<void> {
    const entity = await this.findOne(id);
    await this.announcementRepo.softRemove(entity);
  }
}
