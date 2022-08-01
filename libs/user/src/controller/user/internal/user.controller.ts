import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, IUserService, ViewUserDto } from '../../../app';
import { from, Observable, of } from 'rxjs';
import { UserModuleInjectToken } from '../../../config';

@Controller('user/internal')
export class UserInternalController {
    constructor(
        @Inject(UserModuleInjectToken.USER_SERVICE)
        private readonly _userService: IUserService,
    ) {}

    @Get()
    getAll(): Observable<ViewUserDto[]> {
        return from(this._userService.getAll({} as any));
    }

    @Get(':id')
    getById(@Param('id') id: string): Observable<string> {
        const a = this._userService.getById({id} as any);
        return of('hello bitch');
    }

    @Post()
    create(@Body() payload: CreateUserDto): Promise<boolean> {
        // return from(this._userService.create({} as any));
        return this._userService.create(payload);
    }

    @Put(':id')
    update(@Param('id') id: string): Observable<string> {
        const a = this._userService.update({id} as any);
        return of('hello bitch');
    }

    @Delete(':id')
    delete(@Param('id') id: string): Observable<string> {
        const a = this._userService.delete({id} as any);
        return of('hello bitch');
    }
}
