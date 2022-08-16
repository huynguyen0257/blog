import { Inject } from '@nestjs/common';
import { IUsecase } from '@tommysg/core';
import { UserModuleInjectToken } from '@tommysg/user/config';
import { IUserRepository, UserRepoDto } from '@tommysg/user/domain';
import { from, map, Observable } from 'rxjs';
import { FilterUserDto, ViewUserDto } from '../dto';

export type GetAllUserUCInput = FilterUserDto;
export type GetAllUserUCOutput = Observable<ViewUserDto[]>;

export interface IGetAllUserUsecase extends IUsecase<GetAllUserUCInput, GetAllUserUCOutput> {}

export class GetAllUserUsecase implements IGetAllUserUsecase {
    constructor(
        @Inject(UserModuleInjectToken.USER_REPO)
        private readonly _userRepo: IUserRepository,
    ) {}
    private toDto(dao: UserRepoDto): ViewUserDto {
        return {
            ...dao,
            mobile: dao.mobile || null,
            intro: dao.intro || null,
            profile: dao.profile || null,
        };
    }
    execute(payload: GetAllUserUCInput): GetAllUserUCOutput {
        return from(this._userRepo.getAll(payload)).pipe(
            map((value) => {
                return value.map(this.toDto);
            }),
        );
    }
}
