// TODO: Move to common libs
export interface IService<C, R, U, D, F> {
    getById(id: number | string): Promise<R>;
    getAll(filter: F): Promise<R[]>;
    create(payload: C): Promise<boolean>;
    update(payload: U): Promise<boolean>;
    delete(payload: D): Promise<boolean>;
}
