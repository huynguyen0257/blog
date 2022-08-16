import { Inject, InternalServerErrorException } from '@nestjs/common';
import { IUsecase, MainUseCase } from '@tommysg/core';
import { UserModuleInjectToken } from '@tommysg/user/config';
import {
    CreateUserUCInput,
    CreateUserUCOutput,
    DeleteUserUCInput,
    DeleteUserUCOutput,
    GetAllUserUCInput,
    GetAllUserUCOutput,
    GetByIdUserUCInput,
    GetByIdUserUCOutput,
    ICreateUserUsecase,
    IDeleteUserUsecase,
    IGetAllUserUsecase,
    IGetByIdUserUsecase,
    IUpdateUserUsecase,
    UpdateUserUCInput,
    UpdateUserUCOutput,
} from '.';

export type UserUCInput =
    | GetAllUserUCInput
    | GetByIdUserUCInput
    | CreateUserUCInput
    | UpdateUserUCInput
    | DeleteUserUCInput;

export type UserUCOutput<T> = T extends GetAllUserUCInput
    ? GetAllUserUCOutput
    : T extends GetByIdUserUCInput
    ? GetByIdUserUCOutput
    : T extends CreateUserUCInput
    ? CreateUserUCOutput
    : T extends UpdateUserUCInput
    ? UpdateUserUCOutput
    : T extends DeleteUserUCInput
    ? DeleteUserUCOutput
    : unknown;

export enum UserUsecaseType {
    GET_ALL = 'get_all',
    GET_BY_ID = 'get_by_id',
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}

export class UserUsecase extends MainUseCase<string, UserUCInput, UserUCOutput<UserUCInput>> {
    protected _name = UserUsecase.name;
    constructor(
        @Inject(UserModuleInjectToken.GET_ALL_USER_USECASE)
        getAllUC: IGetAllUserUsecase,
        @Inject(UserModuleInjectToken.GET_BY_ID_USER_USECASE)
        getByIdUC: IGetByIdUserUsecase,
        @Inject(UserModuleInjectToken.CREATE_USER_USECASE)
        createUC: ICreateUserUsecase,
        @Inject(UserModuleInjectToken.UPDATE_USER_USECASE)
        updateUC: IUpdateUserUsecase,
        @Inject(UserModuleInjectToken.DELETE_USER_USECASE)
        deleteUC: IDeleteUserUsecase,
    ) {
        super({
            [UserUsecaseType.GET_ALL]: getAllUC,
            [UserUsecaseType.GET_BY_ID]: getByIdUC,
            [UserUsecaseType.CREATE]: createUC,
            [UserUsecaseType.UPDATE]: updateUC,
            [UserUsecaseType.DELETE]: deleteUC,
        });
    }

    public execute<T extends UserUCInput>(type: UserUsecaseType, payload: T): UserUCOutput<T> {
        const command = this._actions.get(type);
        if (command) return command.execute(payload) as UserUCOutput<T>;
        throw new InternalServerErrorException({
            name: this._name,
            code: 10000,
            message: `${this._name} not found type ${type}`,
        });
    }
}
