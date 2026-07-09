import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UserSeedService } from './user-seed.service';
import { UsersModule } from 'src/users/users.module';
import { PasswordService } from 'src/users/password.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule],
  providers: [UserSeedService, PasswordService],
  exports: [UserSeedService],
})
export class UserSeedModule {}
