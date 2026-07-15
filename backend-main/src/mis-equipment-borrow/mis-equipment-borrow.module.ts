import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MisEquipmentBorrow } from './entities/mis-equipment-borrow.entity';
import { MisEquipmentBorrowService } from './mis-equipment-borrow.service';
import { MisEquipmentBorrowController } from './mis-equipment-borrow.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MisEquipmentBorrow])],
  controllers: [MisEquipmentBorrowController],
  providers: [MisEquipmentBorrowService],
})
export class MisEquipmentBorrowModule {}
