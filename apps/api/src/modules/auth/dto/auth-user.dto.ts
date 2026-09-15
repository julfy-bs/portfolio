import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

// Только то, что можно отдать клиенту: без хеша пароля и служебных полей.
export class AuthUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  role: UserRole;
}
