import { PartialType } from '@nestjs/swagger';
import { CreateMisRepairRequestDto } from './create-mis-repair-request.dto';

export class UpdateMisRepairRequestDto extends PartialType(CreateMisRepairRequestDto) {}
