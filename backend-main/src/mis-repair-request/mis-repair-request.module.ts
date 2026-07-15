import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MisRepairRequest } from './entities/mis-repair-request.entity';
import { MisRepairRequestService } from './mis-repair-request.service';
import { MisRepairRequestController } from './mis-repair-request.controller';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([MisRepairRequest]), FilesModule],
  controllers: [MisRepairRequestController],
  providers: [MisRepairRequestService],
})
export class MisRepairRequestModule {}
