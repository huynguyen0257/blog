import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModuleInjectToken } from '@tommysg/user/config';
import {
    CreateUserDto,
    DeleteUserDto,
    FilterUserDto,
    UpdateUserDto,
    UserUsecase,
    UserUsecaseType,
} from '@tommysg/user/app';
import { lastValueFrom } from 'rxjs';

@Resolver('User')
export class UserResolver {
    constructor(
        @Inject(UserModuleInjectToken.USER_USECASE)
        private readonly _userUC: UserUsecase,
    ) {}

    @Query()
    getUserById(@Args('id') id: string) {
        return this._userUC.execute(UserUsecaseType.GET_BY_ID, { id });
    }
    @Query()
    getAllUser(@Args('filter') filter: FilterUserDto) {
        return this._userUC.execute(UserUsecaseType.GET_ALL, filter);
    }

    // TODO: Define graphql scalar void
    @Mutation()
    async createUser(@Args('createUserDto') payload: CreateUserDto) {
        await lastValueFrom(this._userUC.execute(UserUsecaseType.CREATE, payload));
        return true;
    }
    @Mutation()
    async updateUser(@Args('updateUserDto') payload: UpdateUserDto) {
        await lastValueFrom(this._userUC.execute(UserUsecaseType.UPDATE, payload));
        return true;
    }
    @Mutation()
    async deleteUser(@Args('deleteUserDto') payload: DeleteUserDto) {
        await lastValueFrom(this._userUC.execute(UserUsecaseType.DELETE, payload));
        return true;
    }
}
