import { Module } from '@nestjs/common';
import { ComplainsService } from './complains.service';
import { ComplainsController } from './complains.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complain } from './entities/complain.entity';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Complain]), FilesModule],
  controllers: [ComplainsController],
  providers: [ComplainsService],
})
export class ComplainsModule {}
