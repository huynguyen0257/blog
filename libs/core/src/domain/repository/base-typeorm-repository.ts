import { NotImplementedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IRepository } from './repository.interface';

export abstract class BaseTypeormRepository<K extends string | number, T, F> implements IRepository<K, T, F> {
    getById(id: K): Observable<T> {
        throw new NotImplementedException('BASE_REPOSITORY:getById method not implemented.');
    }
    getAll(filter?: F): Observable<T[]> {
        throw new NotImplementedException('BASE_REPOSITORY:getAll method not implemented.');
    }
    create(payload: T): Observable<boolean> {
        throw new NotImplementedException('BASE_REPOSITORY:create method not implemented.');
    }
    createBulk(payload: T[]): Observable<boolean> {
        throw new NotImplementedException('BASE_REPOSITORY:createBulk method not implemented.');
    }
    update(payload: T): Observable<boolean> {
        throw new NotImplementedException('BASE_REPOSITORY:update method not implemented.');
    }
    updateBulk(payload: T[]): Observable<boolean> {
        throw new NotImplementedException('BASE_REPOSITORY:updateBulk method not implemented.');
    }
    delete(id: K): Observable<boolean> {
        throw new NotImplementedException('BASE_REPOSITORY:delete method not implemented.');
    }
    deleteBulk(id: K[]): Observable<boolean> {
        throw new NotImplementedException('BASE_REPOSITORY:deleteBulk method not implemented.');
    }
}
