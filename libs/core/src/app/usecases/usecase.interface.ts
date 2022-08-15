export interface IUsecase<In, Out> {
    execute(payload: In): Out;
}
