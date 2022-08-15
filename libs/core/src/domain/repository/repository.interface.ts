import { Observable } from "rxjs";

export interface IRepository<K extends string | number, T, F> {
    getById(id: K): Observable<T>;
    getAll(filter?: F): Observable<T[]>;
    create(payload: T): Observable<boolean>;
    createBulk(payload: T[]): Observable<boolean>;
    update(payload: T): Observable<boolean>;
    updateBulk(payload: T[]): Observable<boolean>;
    delete(id: K): Observable<boolean>;
    deleteBulk(id: K[]): Observable<boolean>;
}
