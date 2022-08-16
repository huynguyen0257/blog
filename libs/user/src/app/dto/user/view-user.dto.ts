import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class ViewUserDto extends OmitType(UserDto, ['password'] as const) {}
