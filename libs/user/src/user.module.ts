import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    CreateUserUsecase,
    DeleteUserUsecase,
    GetAllUserUsecase,
    GetByIdUserUsecase,
    UpdateUserUsecase,
    UserUsecase,
} from './app';
import { UserModuleInjectToken } from './config';
import { UserInternalControllerV1, UserInternalControllerV2 } from './controller';
import { UserRepository } from './infra/database/user.repo.impl';
import { UserTable } from './infra/database/user.table';

const publishProvider = [
    {
        provide: UserModuleInjectToken.USER_REPO,
        useClass: UserRepository,
    },
    {
        provide: UserModuleInjectToken.GET_ALL_USER_USECASE,
        useClass: GetAllUserUsecase,
    },
    {
        provide: UserModuleInjectToken.GET_BY_ID_USER_USECASE,
        useClass: GetByIdUserUsecase,
    },
    {
        provide: UserModuleInjectToken.CREATE_USER_USECASE,
        useClass: CreateUserUsecase,
    },
    {
        provide: UserModuleInjectToken.UPDATE_USER_USECASE,
        useClass: UpdateUserUsecase,
    },
    {
        provide: UserModuleInjectToken.DELETE_USER_USECASE,
        useClass: DeleteUserUsecase,
    },
    {
        provide: UserModuleInjectToken.USER_USECASE,
        useClass: UserUsecase,
    },
];

@Module({
    imports: [TypeOrmModule.forFeature([UserTable])],
    controllers: [UserInternalControllerV1, UserInternalControllerV2],
    providers: publishProvider,
    // exports: [...publishProvider, TypeOrmModule]
    exports: [...publishProvider],
})
export class UserModule {}
