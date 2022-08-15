import { HttpException, HttpStatus, Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { IService } from '@tommysg/core';
import { UserModuleInjectToken } from '@tommysg/user/config';
import { UserEntity, UserRepoDto } from '@tommysg/user/domain';
import { UserRepository } from '@tommysg/user/infra/database/user.repo.impl';
import { from, lastValueFrom, map, mergeMap, Observable, of } from 'rxjs';
import { CreateUserDto, DeleteUserDto, FilterUserDto, UpdateUserDto, ViewUserDto } from '../../dto';

export interface IUserService extends IService<CreateUserDto, ViewUserDto, UpdateUserDto, DeleteUserDto, FilterUserDto> {}

// TODO: Complete UserService
@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject(UserModuleInjectToken.USER_REPO)
        private readonly _userRepo: UserRepository,
    ) {}

    private map(entity: UserEntity): ViewUserDto {
        return {
            id: entity.id,
            email: entity.email,
            firstName: entity.firstName,
            middleName: entity.middleName,
            lastName: entity.lastName,
            intro: entity.intro,
            mobile: entity.mobile,
            profile: entity.profile,
        };
    }

    private toDto(dao: UserRepoDto): ViewUserDto {
        return {
            ...dao,
            mobile: dao.mobile || null,
            intro: dao.intro || null,
            profile: dao.profile || null,
        };
    }

    getById(id: string): Observable<ViewUserDto> {
        return from(this._userRepo.getById(id)).pipe(map(this.toDto));
    }

    getAll(filter: FilterUserDto): Observable<ViewUserDto[]> {
        return from(this._userRepo.getAll(filter)).pipe(
            map((value) => {
                return value.map(this.toDto);
            }),
        );
    }

    create(payload: CreateUserDto): Observable<boolean> {
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
    update(payload: UpdateUserDto): Observable<boolean> {
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
    delete(payload: DeleteUserDto): Observable<boolean> {
        return of(payload).pipe(
            mergeMap(async (payload) => {
                if (!payload.id) throw new HttpException('Missing id', HttpStatus.BAD_REQUEST);
                const daoDto = await lastValueFrom(this._userRepo.getById(payload.id));
                return [daoDto, payload];
            }),
            mergeMap(([daoDto, payload]) => {
                return this._userRepo.delete(payload.id);
            }),
        );
    }
}
