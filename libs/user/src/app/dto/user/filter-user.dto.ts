import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterUserDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    email: string;
}
