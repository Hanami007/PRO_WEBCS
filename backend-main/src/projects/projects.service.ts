import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  paginate,
  PaginateQuery,
  Paginated,
  FilterOperator,
} from 'nestjs-paginate';
import { FilesService } from 'src/files/files.service';
import { Personnel } from 'src/personnel/entities/personnel.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(Personnel)
    private readonly personnelRepository: Repository<Personnel>,
    private readonly filesService: FilesService,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const chairman = await this.personnelRepository.findOneBy({
      id: createProjectDto.chairman.id,
    });
    if (!chairman) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          chairman: 'chairmanNotFound',
        },
      });
    }

    const director1 = createProjectDto.director1
      ? await this.personnelRepository.findOneBy({
          id: createProjectDto.director1.id,
        })
      : null;

    const director2 = createProjectDto.director2
      ? await this.personnelRepository.findOneBy({
          id: createProjectDto.director2.id,
        })
      : null;

    const project = this.projectsRepository.create({
      ...createProjectDto,
      chairman,
      director1,
      director2,
    });
    return await this.projectsRepository.save(project);
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Project>> {
    return await paginate(query, this.projectsRepository, {
      sortableColumns: ['createdAt', 'updatedAt', 'name', 'year'],
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['name', 'code', 'detail', 'editors'],
      relations: ['file', 'chairman', 'director1', 'director2'],
      filterableColumns: {
        name: [FilterOperator.EQ],
        year: [FilterOperator.EQ],
      },
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['file', 'chairman', 'director1', 'director2'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.projectsRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    const { file, chairman, director1, director2, ...rest } = updateProjectDto;
    Object.assign(project, rest);

    if (file?.id) {
      const fileObject = await this.filesService.findById(file.id);
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'fileNotExists',
          },
        });
      }
      project.file = fileObject;
    } else if (file === null) {
      project.file = null;
    }

    if (chairman?.id) {
      const chairmanObject = await this.personnelRepository.findOneBy({
        id: chairman.id,
      });
      if (!chairmanObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            chairman: 'chairmanNotFound',
          },
        });
      }
      project.chairman = chairmanObject;
    }

    if (director1?.id) {
      const director1Object = await this.personnelRepository.findOneBy({
        id: director1.id,
      });
      if (!director1Object) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            director1: 'director1NotFound',
          },
        });
      }
      project.director1 = director1Object;
    } else if (director1 === null) {
      project.director1 = null;
    }

    if (director2?.id) {
      const director2Object = await this.personnelRepository.findOneBy({
        id: director2.id,
      });
      if (!director2Object) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            director2: 'director2NotFound',
          },
        });
      }
      project.director2 = director2Object;
    } else if (director2 === null) {
      project.director2 = null;
    }

    return this.projectsRepository.save(project);
  }

  async remove(id: string): Promise<{ message: string }> {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['file'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    if (project.file) {
      await this.filesService.remove(project.file.id);
    }

    await this.projectsRepository.softDelete(id);
    return { message: 'deleted' };
  }
}
