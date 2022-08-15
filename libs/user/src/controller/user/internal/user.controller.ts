import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateUserDto, FilterUserDto, IUserService, UpdateUserDto, ViewUserDto } from '../../../app';
import { UserModuleInjectToken } from '../../../config';

@Controller('user/internal')
export class UserInternalController {
    constructor(
        @Inject(UserModuleInjectToken.USER_SERVICE)
        private readonly _userService: IUserService,
    ) {}

    @Get()
    getAll(@Query() filter: FilterUserDto): Observable<ViewUserDto[]> {
        return this._userService.getAll(filter);
    }

    @Get(':id')
    getById(@Param('id') id: string): Observable<ViewUserDto> {
        return this._userService.getById(id);
    }

    @Post()
    create(@Body() payload: CreateUserDto): Observable<boolean> {
        return this._userService.create(payload);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() payload: UpdateUserDto): Observable<boolean> {
        return this._userService.update({ id, ...payload });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<boolean> {
        return this._userService.delete({ id } as any);
    }
}
