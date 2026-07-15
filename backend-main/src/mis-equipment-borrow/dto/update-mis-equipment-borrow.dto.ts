import { PartialType } from '@nestjs/swagger';
import { CreateMisEquipmentBorrowDto } from './create-mis-equipment-borrow.dto';

export class UpdateMisEquipmentBorrowDto extends PartialType(CreateMisEquipmentBorrowDto) {}
