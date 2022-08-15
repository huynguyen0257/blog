import { IsOptional, IsString } from "class-validator"

export class FilterUserDto {
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    email: string
}
