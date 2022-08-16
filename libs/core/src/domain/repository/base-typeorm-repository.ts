import { HttpException, HttpStatus, NotImplementedException } from '@nestjs/common';
import { map, mergeMap, Observable, of } from 'rxjs';
import { BaseEntity, Repository } from 'typeorm';
import { IRepository } from './repository.interface';

export type BaseOrmTable<Key extends string | number> = BaseEntity & {
    id: Key;
};

export type BaseTypeormRepositoryDto<Key extends string | number> = {
    id: Key;
    [key: string]: any;
};

export abstract class BaseTypeormRepository<
    Key extends string | number,
    Dto extends BaseTypeormRepositoryDto<Key>,
    Table extends BaseOrmTable<Key>,
> implements IRepository<Key, Dto, unknown>
{
    protected abstract _ormRepo: Repository<Table>;
    protected abstract toDto(table: Table): Dto;
    getById(id: Key): Observable<Dto> {
        return of(id)
            .pipe(
                mergeMap(async (id) => {
                    return this._ormRepo.findOneBy({
                        id: id,
                    } as any);
                }),
            )
            .pipe(
                map((table) => {
                    if (!table) throw new HttpException(`Not found`, HttpStatus.NOT_FOUND);
                    return this.toDto(table);
                }),
            );
    }
    getAll(filter?: unknown): Observable<Dto[]> {
        return of(filter).pipe(
            mergeMap(async (filter) => {
                if (filter)
                    throw new NotImplementedException(
                        'BASE_REPOSITORY:getAll with filter method not implemented.',
                    );
                return this._ormRepo.find();
            }),
            map((tables) => {
                return tables.map(this.toDto);
            }),
        );
    }
    create(payload: Dto): Observable<boolean> {
        return of(payload).pipe(
            mergeMap(async (payload) => {
                await this._ormRepo.insert(payload);
                return true;
            }),
        );
    }
    createBulk(payload: Dto[]): Observable<boolean> {
        return of(payload).pipe(
            mergeMap(async (payload) => {
                await this._ormRepo.insert(payload);
                return true;
            }),
        );
    }
    update(payload: Dto): Observable<boolean> {
        return of(payload).pipe(
            mergeMap(async (payload) => {
                await this._ormRepo.update(payload.id, payload);
                return true;
            }),
        );
    }
    updateBulk(payload: Dto[]): Observable<boolean> {
        return of(payload).pipe(
            mergeMap(async (payload) => {
                const queryRunner = this._ormRepo.queryRunner;
                queryRunner.startTransaction();
                const query = [];
                for (const dto of payload) {
                    const sql = this._ormRepo.update(dto.id, dto);
                    query.push(sql);
                }
                try {
                    await Promise.all(query);
                    await queryRunner.commitTransaction();
                } catch (error: any) {
                    await queryRunner.rollbackTransaction();
                    throw error;
                }
                return true;
            }),
        );
    }
    delete(id: Key): Observable<boolean> {
        return of(id).pipe(
            mergeMap(async (id) => {
                await this._ormRepo.delete(id);
                return true;
            }),
        );
    }
    deleteBulk(ids: Key[]): Observable<boolean> {
        return of(ids).pipe(
            mergeMap(async (ids) => {
                const queryRunner = this._ormRepo.queryRunner;
                queryRunner.startTransaction();
                const query = [];
                for (const id of ids) {
                    const sql = this._ormRepo.delete(id);
                    query.push(sql);
                }
                try {
                    await Promise.all(query);
                    await queryRunner.commitTransaction();
                } catch (error: any) {
                    await queryRunner.rollbackTransaction();
                    throw error;
                }
                return true;
            }),
        );
    }
}
