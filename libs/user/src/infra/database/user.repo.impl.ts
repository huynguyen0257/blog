import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeormRepository } from '@tommysg/core';
import { FilterUserRepoType, IUserRepository, UserRepoDto } from '@tommysg/user/domain';
import { map, mergeMap, Observable, of } from 'rxjs';
import { Repository } from 'typeorm';
import { UserTable } from './user.table';

@Injectable()
export class UserRepository
    extends BaseTypeormRepository<string, UserRepoDto, UserTable>
    implements IUserRepository
{
    constructor(@InjectRepository(UserTable) protected readonly _ormRepo: Repository<UserTable>) {
        super();
    }

    protected toDto(table: UserTable): UserRepoDto {
        return {
            ...table,
            intro: table.intro || undefined,
            profile: table.profile || undefined,
            lastLogin: table.lastLogin || undefined,
            updatedAt: table.updatedAt || undefined,
            mobile: table.mobile || undefined,
        };
    }

    getAll(filter?: FilterUserRepoType): Observable<UserRepoDto[]> {
        return of(filter).pipe(
            mergeMap(async (filter) => {
                const sql = this._ormRepo.createQueryBuilder('users');
                if (filter.email) {
                    sql.where('users.email LIKE :email', {
                        email: `%${filter.email || ''}%`,
                    });
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
                        });
                }
                return sql.getMany();
            }),
            map<UserTable[], UserRepoDto[]>((tables) => {
                return tables.map((t) => ({
                    ...t,
                }));
            }),
        );
    }
}
