import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetByIdUserDto {
    @IsString()
    @ApiProperty()
    id: string;
}
