import { Observable } from 'rxjs';

// TODO: Move to common libs
export interface IService<C, R, U, D, F> {
    getById(id: number | string): Observable<R>;
    getAll(filter: F): Observable<R[]>;
    create(payload: C): Observable<boolean>;
    update(payload: U): Observable<boolean>;
    delete(payload: D): Observable<boolean>;
}
