import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
    CreateUserDto,
    DeleteUserDto,
    FilterUserDto,
    GetByIdUserDto,
    IUserService,
    UpdateUserDto,
    UserUsecase,
    UserUsecaseType,
    ViewUserDto,
} from '../../../app';
import { UserModuleInjectToken } from '../../../config';

@Controller('user/internal')
export class UserInternalController {
    constructor(
        @Inject(UserModuleInjectToken.USER_SERVICE)
        private readonly _userService: IUserService,
        @Inject(UserModuleInjectToken.USER_USECASE)
        private readonly _userUC: UserUsecase,
    ) {}

    @Get()
    getAll(@Query() filter: FilterUserDto): Observable<ViewUserDto[]> {
        // return this._userService.getAll(filter);
        return this._userUC.execute(UserUsecaseType.GET_ALL, filter);
    }

    @Get(':id')
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

    // TODO: Fix bug deleteId must be a string
    @Delete(':id')
    delete(@Param() payload: DeleteUserDto): Observable<boolean> {
        return this._userUC.execute(UserUsecaseType.DELETE, payload);
    }
}
