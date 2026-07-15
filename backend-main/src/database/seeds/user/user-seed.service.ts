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

    // Add Student User
    const studentEmail = '6604101335@mju.ac.th';
    const studentUser = await this.repository.findOne({
      where: { email: studentEmail },
    });

    if (!studentUser) {
      const hashedPassword =
        await this.passwordService.hash('MJU@02082004');
      const newUser = this.repository.create({
        name: 'นักศึกษา (6604101335)',
        email: studentEmail,
        password: hashedPassword,
        role: {
          id: RoleEnum.user,
        } as Role,
      });

      await this.repository.save(newUser);
    }
  }
}
