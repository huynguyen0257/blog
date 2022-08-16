import { IsString } from 'class-validator';

export class DeleteUserDto {
    @IsString()
    deleteId: string;
}
