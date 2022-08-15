import { IRepository } from '@tommysg/core';
import { FilterUserRepoType, UserRepoDto } from './types';

export interface IUserRepository extends IRepository<string, UserRepoDto, FilterUserRepoType> {}
