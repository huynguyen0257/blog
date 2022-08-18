import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Observable, of } from 'rxjs';
import {
    CreateUserDto,
    DeleteUserDto,
    DeleteUserUCInput,
    FilterUserDto,
    GetByIdUserDto,
    UpdateUserDto,
    UserUsecase,
    UserUsecaseType,
    ViewUserDto,
} from '@tommysg/user/app';
import { UserModuleInjectToken } from '@tommysg/user/config';

@Controller({
    path: 'user/internal',
    version: '2',
})
export class UserInternalControllerV2 {
    constructor(
        @Inject(UserModuleInjectToken.USER_USECASE)
        private readonly _userUC: UserUsecase,
    ) {}

    @Get()
    @ApiOkResponse({ type: [ViewUserDto] })
    getAll(@Query() filter: FilterUserDto): Observable<ViewUserDto[]> {
        return this._userUC.execute(UserUsecaseType.GET_ALL, filter);
    }

    @Get(':id')
    @ApiOkResponse({ type: ViewUserDto })
    getById(@Param() payload: GetByIdUserDto): Observable<ViewUserDto> {
        // return this._userService.getById(id);
        return this._userUC.execute(UserUsecaseType.GET_BY_ID, payload);
    }

    @Post()
    create(@Body() payload: CreateUserDto): Observable<boolean> {
        // return this._userService.create(payload);
        return this._userUC.execute(UserUsecaseType.CREATE, payload);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() payload: UpdateUserDto): Observable<boolean> {
        payload.id = id;
        return this._userUC.execute(UserUsecaseType.UPDATE, payload);
    }

    @Delete(':deleteId')
    delete(@Param() payload: DeleteUserDto): Observable<boolean> {
        return this._userUC.execute(UserUsecaseType.DELETE, payload as DeleteUserUCInput);
    }
}
