import { PartialType } from '@nestjs/swagger';
import { CreateMisCoursePendingDto } from './create-mis-course-pending.dto';

export class UpdateMisCoursePendingDto extends PartialType(CreateMisCoursePendingDto) {}
