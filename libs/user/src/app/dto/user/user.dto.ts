import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    middleName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    mobile: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    intro: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    profile: string;
}
