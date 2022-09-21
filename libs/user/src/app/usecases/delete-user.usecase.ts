import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IUsecase } from '@tommysg/core';
import { UserModuleInjectToken } from '@tommysg/user/config';
import { IUserRepository } from '@tommysg/user/domain';
import { lastValueFrom, mergeMap, Observable, of } from 'rxjs';
import { DeleteUserDto } from '../dto';

export type DeleteUserUCInput = DeleteUserDto;
export type DeleteUserUCOutput = Observable<void>;

export interface IDeleteUserUsecase extends IUsecase<DeleteUserUCInput, DeleteUserUCOutput> {}

export class DeleteUserUsecase implements IDeleteUserUsecase {
    constructor(
        @Inject(UserModuleInjectToken.USER_REPO)
        private readonly _userRepo: IUserRepository,
    ) {}
    execute(payload: DeleteUserUCInput): DeleteUserUCOutput {
        return of(payload).pipe(
            mergeMap(async (payload) => {
                if (!payload.deleteId)
                    throw new HttpException('Missing id', HttpStatus.BAD_REQUEST);
                const daoDto = await lastValueFrom(this._userRepo.getById(payload.deleteId));
                if (!daoDto) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
                return payload;
            }),
            mergeMap((payload) => this._userRepo.delete(payload.deleteId)),
        );
    }
}
