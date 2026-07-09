import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { RoleEnum } from '../roles/roles.enum';
import { FilesService } from '../files/files.service';
import { File } from '../files/entities/file.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../roles/entities/role.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly filesService: FilesService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findOneByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const { role, photo, password, ...userData } = createUserDto;

    let fileObject: File | null = null;

    if (photo?.id) {
      fileObject = await this.filesService.findOne(photo.id);
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: 422,
          errors: { photo: 'imageNotExists' },
        });
      }
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
      role: {
        id: role ? Number(role.id) : RoleEnum.user,
      } as Role,
      photo: fileObject,
    });

    return await this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const { role, photo, ...userData } = updateUserDto;

    const updatePayload: Partial<User> = { ...userData };

    if (role) {
      updatePayload.role = { id: Number(role.id) } as Role;
    }

    if (photo?.id) {
      const fileObject = await this.filesService.findOne(photo.id);
      if (!fileObject) {
        throw new UnprocessableEntityException({
          status: 422,
          errors: { photo: 'imageNotExists' },
        });
      }
      updatePayload.photo = fileObject;
    }

    await this.userRepository.update(id, updatePayload);

    return this.findOne(id);
  }

  async updatePassword(id: string, newPasswordHash: string): Promise<void> {
    await this.userRepository.update(id, { password: newPasswordHash });
  }

  async softDelete(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
