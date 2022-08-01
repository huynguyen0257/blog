import { OmitType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class ViewUserDto extends OmitType(UserDto, ['password'] as const) {}
