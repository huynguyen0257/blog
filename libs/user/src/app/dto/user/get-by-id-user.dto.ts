import { IsString } from 'class-validator';

export class GetByIdUserDto {
    @IsString()
    id: string;
}
