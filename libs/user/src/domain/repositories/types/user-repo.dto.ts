import { UserEntityProps } from '../../entities';

export type UserRepoDto = UserEntityProps & {
    id: string;
};

export type FilterUserRepoType = {
    name?: string;
    email?: string;
};
