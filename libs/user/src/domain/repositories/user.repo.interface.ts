import { IRepository } from '@tommysg/core';
import { UserEntityProps } from '../entities';

export type UserRepoDto = UserEntityProps & {
    id: string;
};

export type FilterUserRepoType = {
    name?: string;
    email?: string;
};

export interface IUserRepository extends IRepository<string, UserRepoDto, FilterUserRepoType> {}
