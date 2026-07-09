import { RoleEnum } from '../../roles/roles.enum';

export class UserResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: RoleEnum;
}
