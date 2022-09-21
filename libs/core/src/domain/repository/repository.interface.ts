import { Observable } from 'rxjs';

export interface IRepository<K extends string | number, Repo, Filter> {
    getById(id: K): Observable<Repo>;
    getAll(filter?: Filter): Observable<Repo[]>;
    create(payload: Repo): Observable<boolean>;
    createBulk(payload: Repo[]): Observable<boolean>;
    update(payload: Repo): Observable<boolean>;
    updateBulk(payload: Repo[]): Observable<boolean>;
    delete(id: K): Observable<boolean>;
    deleteBulk(ids: K[]): Observable<boolean>;
}
