import { Inject } from '@nestjs/common';
import { IUsecase } from '@tommysg/core';
import { UserModuleInjectToken } from '@tommysg/user/config';
import { IUserRepository, UserRepoDto } from '@tommysg/user/domain';
import { from, map, Observable } from 'rxjs';
import { GetByIdUserDto, ViewUserDto } from '../dto';

export type GetByIdUserUCInput = GetByIdUserDto;
export type GetByIdUserUCOutput = Observable<ViewUserDto>;

export interface IGetByIdUserUsecase extends IUsecase<GetByIdUserUCInput, GetByIdUserUCOutput> {}

export class GetByIdUserUsecase implements IGetByIdUserUsecase {
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
    execute(payload: GetByIdUserUCInput): GetByIdUserUCOutput {
        return from(this._userRepo.getById(payload.id)).pipe(map(this.toDto));
    }
}
