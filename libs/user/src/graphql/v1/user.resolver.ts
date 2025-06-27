import { Inject, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModuleInjectToken } from '@tommysg/user/config';
import { UserUsecase, UserUsecaseType, ViewUserDto } from '@tommysg/user/app';
import { lastValueFrom, Observable } from 'rxjs';
import { FilterUserGraphQL, GetAllUserGraphQL, GetByIdUserGraphQL, ViewUserGraphQL } from './dto';

@Resolver((of) => ViewUserGraphQL)
export class UserResolver {
    private readonly _logger = new Logger(UserResolver.name);
    constructor(
        @Inject(UserModuleInjectToken.USER_USECASE)
        private readonly _userUC: UserUsecase,
    ) {}

    @Query((returns) => GetByIdUserGraphQL)
    getUserById(@Args('id') id: string): Observable<ViewUserDto> {
        return this._userUC.execute(UserUsecaseType.GET_BY_ID, { id });
    }

    @Query((returns) => GetAllUserGraphQL)
    getAllUser(@Args() filter: FilterUserGraphQL) {
        this._logger.log('getAllUser');
        return this._userUC.execute(UserUsecaseType.GET_ALL, filter);
    }

    // TODO: Define graphql scalar void
    // @Mutation()
    // async createUser(@Args('createUserDto') payload: CreateUserDto) {
    //     await lastValueFrom(this._userUC.execute(UserUsecaseType.CREATE, payload));
    //     return true;
    // }
    // @Mutation()
    // async updateUser(@Args('updateUserDto') payload: UpdateUserDto) {
    //     await lastValueFrom(this._userUC.execute(UserUsecaseType.UPDATE, payload));
    //     return true;
    // }
    // @Mutation()
    // async deleteUser(@Args('deleteUserDto') payload: DeleteUserDto) {
    //     await lastValueFrom(this._userUC.execute(UserUsecaseType.DELETE, payload));
    //     return true;
    // }
}
