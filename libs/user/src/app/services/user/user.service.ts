import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from '@tommysg/user/core';
import { UserEntity } from '@tommysg/user/entities';
import { Repository } from 'typeorm';
import { CreateUserDto, DeleteUserDto, UpdateUserDto, ViewUserDto } from '../../dto';

export interface IUserService extends IService<CreateUserDto, ViewUserDto, UpdateUserDto, DeleteUserDto, unknown> {}

@Injectable()
export class UserService implements IUserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly _userRepo: Repository<UserEntity>,
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
            profile: entity.profile
        };
    }

    getById(id: string | number): Promise<ViewUserDto> {
        throw new NotImplementedException({
            message: 'UserService getById',
            id,
        });
    }

    async getAll(filter: unknown): Promise<ViewUserDto[]> {
        const value = await this._userRepo.find();
        return value.map(this.map);
    }

    async create(payload: CreateUserDto): Promise<boolean> {
        const entity = await UserEntity.create(payload);
        await this._userRepo.save(entity);
        return true;
        
    }
    update(payload: UpdateUserDto): Promise<boolean> {
        throw new NotImplementedException({
            message: 'UserService update',
            payload,
        });
    }
    delete(payload: DeleteUserDto): Promise<boolean> {
        throw new NotImplementedException({
            message: 'UserService delete',
            payload,
        });
    }
}
