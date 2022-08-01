import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

class RequiredCreateUserDto extends PickType(UserDto, ['firstName', 'middleName', 'mobile', 'lastName', 'email', 'password']) {}
class OptionalCreateUserDto extends PartialType(
    PickType(UserDto, ['intro', 'profile']),
) {}

export class CreateUserDto extends IntersectionType(RequiredCreateUserDto, OptionalCreateUserDto) {}
