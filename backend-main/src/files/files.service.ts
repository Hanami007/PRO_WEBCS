import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.types';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async create(file: Express.Multer.File): Promise<File> {
    if (!file) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          file: 'selectFile',
        },
      });
    }

    const newFile = this.fileRepository.create({ path: file.path });

    return await this.fileRepository.save(newFile);
  }

  async createFromLocalPath(
    sourcePath: string,
    destinationSubFolder: string,
  ): Promise<File> {
    const filename = path.basename(sourcePath);
    const filesPath =
      this.configService.getOrThrow('file.path', { infer: true }) || 'files';

    const resolvedFilesPath = path.resolve(process.cwd(), filesPath);
    const destinationFolder = path.join(
      resolvedFilesPath,
      destinationSubFolder,
    );
    const destinationPath = path.join(destinationFolder, filename);

    const relativePath = `${filesPath}/${destinationSubFolder}/${filename}`;

    await fs.promises.mkdir(destinationFolder, { recursive: true });

    await fs.promises.copyFile(sourcePath, destinationPath);

    const newFile = this.fileRepository.create({ path: relativePath });
    return await this.fileRepository.save(newFile);
  }

  async findOne(id: string): Promise<File | null> {
    return this.fileRepository.findOneBy({ id });
  }

  async findById(id: string): Promise<File> {
    const file = await this.fileRepository.findOneBy({ id });

    if (!file) {
      throw new NotFoundException();
    }

    return file;
  }

  async remove(id: string): Promise<void> {
    const file = await this.fileRepository.findOneBy({ id });

    if (!file) {
      throw new NotFoundException(`File with ID ${id} not found.`);
    }

    try {
      await fs.promises.unlink(file.path);
    } catch (error) {
      console.error(
        `Failed to delete file from disk: ${file.path}. Error: ${error.message}`,
      );
    }

    await this.fileRepository.delete(id);
  }
}
