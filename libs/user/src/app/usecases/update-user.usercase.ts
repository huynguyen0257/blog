import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IUsecase } from '@tommysg/core';
import { UserModuleInjectToken } from '@tommysg/user/config';
import { IUserRepository, UserEntity } from '@tommysg/user/domain';
import { lastValueFrom, mergeMap, Observable, of } from 'rxjs';
import { UpdateUserDto } from '../dto';

export type UpdateUserUCInput = UpdateUserDto;
export type UpdateUserUCOutput = Observable<boolean>;

export interface IUpdateUserUsecase extends IUsecase<UpdateUserUCInput, UpdateUserUCOutput> {}

export class UpdateUserUsecase implements IUpdateUserUsecase {
    constructor(
        @Inject(UserModuleInjectToken.USER_REPO)
        private readonly _userRepo: IUserRepository,
    ) {}
    execute(payload: UpdateUserUCInput): UpdateUserUCOutput {
        return of(payload).pipe(
            mergeMap(async (payload) => {
                if (!payload.id) throw new HttpException('Missing id', HttpStatus.BAD_REQUEST);
                const daoDto = await lastValueFrom(this._userRepo.getById(payload.id));
                return [daoDto, payload];
            }),
            mergeMap(async ([daoDto, payload]) => {
                const entity = await UserEntity.create(daoDto);
                await entity.update(payload);
                return entity;
            }),
            mergeMap((entity) => {
                return this._userRepo.update({ ...entity.props, id: entity.id });
            }),
        );
    }
}
