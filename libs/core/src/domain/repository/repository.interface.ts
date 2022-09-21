import { Observable } from 'rxjs';

export interface IRepository<K extends string | number, Repo, Filter> {
    getById(id: K): Observable<Repo>;
    getAll(filter?: Filter): Observable<Repo[]>;
    create(payload: Repo): Observable<void>;
    createBulk(payload: Repo[]): Observable<void>;
    update(payload: Repo): Observable<void>;
    updateBulk(payload: Repo[]): Observable<void>;
    delete(id: K): Observable<void>;
    deleteBulk(ids: K[]): Observable<void>;
}
