import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordService } from 'src/users/password.service';
import { RoleEnum } from 'src/roles/roles.enum';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private passwordService: PasswordService,
  ) {}

  async run() {
    const adminEmail = 'admin@example.com';
    const adminUser = await this.repository.findOne({
      where: { email: adminEmail },
    });

    if (!adminUser) {
      const hashedPassword =
        await this.passwordService.hash('CSMJUadmin1245...');
      const newUser = this.repository.create({
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,

        role: {
          id: RoleEnum.admin,
        } as Role,
      });

      await this.repository.save(newUser);
    }
  }
}
