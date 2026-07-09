import { Module } from '@nestjs/common';
import { AlumnisService } from './alumnis.service';
import { AlumnisController } from './alumnis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumni } from './entities/alumni.entity';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Alumni]), FilesModule],
  controllers: [AlumnisController],
  providers: [AlumnisService],
})
export class AlumnisModule {}
