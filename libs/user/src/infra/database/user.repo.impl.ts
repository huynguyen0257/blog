import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeormRepository } from '@tommysg/core';
import { FilterUserRepoType, IUserRepository, UserEntityProps, UserRepoDto } from '@tommysg/user/domain';
import { map, mergeMap, Observable, of } from 'rxjs';
import { Repository } from 'typeorm';
import { UserTable } from './user.table';

@Injectable()
export class UserRepository
    extends BaseTypeormRepository<string, UserRepoDto, FilterUserRepoType>
    implements IUserRepository
{
    constructor(@InjectRepository(UserTable) private readonly _ormRepo: Repository<UserTable>) {
        super();
    }
    getById(id: string): Observable<UserRepoDto> {
        return of(id).pipe(
            mergeMap(async (id) => {
                return this._ormRepo.findOneBy({
                    id: id,
                });
            }),
        ).pipe(
            map<UserTable | null, UserRepoDto>((table) => {
                if (!table) throw new HttpException(`Not found`, HttpStatus.NOT_FOUND);
                return {
                    ...table,
                    intro: table.intro || undefined,
                    profile: table.profile || undefined,
                    lastLogin: table.lastLogin || undefined,
                    updatedAt: table.updatedAt || undefined,
                    mobile: table.mobile || undefined,
                }
            })
        );
    }

    getAll(filter?: FilterUserRepoType): Observable<UserRepoDto[]> {
        return of(filter).pipe(
            mergeMap(async (filter) => {
                let sql = this._ormRepo
                    .createQueryBuilder('users');
                    if (filter.email){
                        sql.where('users.email LIKE :email', {
                            email: `%${filter.email || ''}%`
                        })
                    }
                    if (filter.name) {
                        sql.andWhere('LOWER(users.first_name) LIKE :name', {
                            name: `%${filter.name.toLocaleLowerCase()}%`,
                        })
                        .orWhere('LOWER(users.last_name) LIKE :name', {
                            name: `%${filter.name.toLocaleLowerCase()}%`,
                        })
                        .orWhere('LOWER(users.middle_name) LIKE :name', {
                            name: `%${filter.name.toLocaleLowerCase()}%`,
                        })
                    }
                console.log(sql.getSql());
                return sql.getMany();
            }),
            map<UserTable[], UserRepoDto[]>((tables) => {
                return tables.map((t) => ({
                    ...t
                }))
            })
        );
    }

    create(payload: UserRepoDto): Observable<boolean> {
        return of(payload).pipe(
            mergeMap(async (payload) => {
                await this._ormRepo.insert(payload);
                return true;
            }),
        );
    }

    update(payload: UserRepoDto): Observable<boolean> {
        return of(payload).pipe(
            mergeMap(async (payload) => {
                await this._ormRepo.update(payload.id, payload);
                return true;
            }),
        );
    }

    delete(id: string): Observable<boolean> {
        return of(id).pipe(
            mergeMap(async (id) => {
                await this._ormRepo.delete(id);
                return true;
            }),
        );
    }
}
