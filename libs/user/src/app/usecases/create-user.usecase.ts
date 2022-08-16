import { Inject } from '@nestjs/common';
import { IUsecase } from '@tommysg/core';
import { UserModuleInjectToken } from '@tommysg/user/config';
import { IUserRepository, UserEntity } from '@tommysg/user/domain';
import { mergeMap, Observable, of } from 'rxjs';
import { CreateUserDto } from '../dto';

export type CreateUserUCInput = CreateUserDto;
export type CreateUserUCOutput = Observable<boolean>;

export interface ICreateUserUsecase extends IUsecase<CreateUserUCInput, CreateUserUCOutput> {}

export class CreateUserUsecase implements ICreateUserUsecase {
    constructor(
        @Inject(UserModuleInjectToken.USER_REPO)
        private readonly _userRepo: IUserRepository,
    ) {}
    execute(payload: CreateUserUCInput): CreateUserUCOutput {
        return of(payload).pipe(
            mergeMap(async (payload) => {
                return UserEntity.create(payload);
            }),
            mergeMap((entity) => {
                return this._userRepo.create({
                    id: entity.id,
                    ...entity.props,
                });
            }),
        );
    }
}
