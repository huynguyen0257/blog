
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface GetAllUserFilter {
    name?: Nullable<string>;
    email?: Nullable<string>;
}

export interface CreateUserDto {
    firstName: string;
    middleName: string;
    lastName: string;
    mobile: string;
    email: string;
    password: string;
    intro?: Nullable<string>;
    profile?: Nullable<string>;
}

export interface UpdateUserDto {
    id: string;
    firstName?: Nullable<string>;
    middleName?: Nullable<string>;
    lastName?: Nullable<string>;
    mobile?: Nullable<string>;
    intro?: Nullable<string>;
    profile?: Nullable<string>;
}

export interface DeleteUserDto {
    deleteId: string;
}

export interface User {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    mobile: string;
    email: string;
    intro: string;
    profile: string;
}

export interface ReturnGetByIdData {
    data: User;
}

export interface ReturnGetAllUserData {
    data: Nullable<User>[];
}

export interface IQuery {
    getUserById(id: string): ReturnGetByIdData | Promise<ReturnGetByIdData>;
    getAllUser(filter?: Nullable<GetAllUserFilter>): ReturnGetAllUserData | Promise<ReturnGetAllUserData>;
}

export interface MutationReturn {
    data: boolean;
}

export interface IMutation {
    createUser(createUserDto: CreateUserDto): MutationReturn | Promise<MutationReturn>;
    updateUser(updateUserDto: UpdateUserDto): MutationReturn | Promise<MutationReturn>;
    deleteUser(deleteUserDto: DeleteUserDto): MutationReturn | Promise<MutationReturn>;
}

type Nullable<T> = T | null;
