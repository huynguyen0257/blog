import { InternalServerErrorException } from '@nestjs/common';
import { IUsecase } from './usecase.interface';

export abstract class MainUseCase<T extends string, In, Out> {
    protected abstract _name: string;
    constructor(commands: Record<string, IUsecase<In, Out>>) {
        Object.keys(commands).forEach((type: string) => {
            this.register(type as T, commands[type]);
        });
    }
    protected _actions: Map<T, IUsecase<In, Out>> = new Map();
    private register(type: T, command: IUsecase<In, Out>) {
        this._actions.set(type, command);
    }
    public execute<E extends In>(type: T, payload: E): Out {
        const command = this._actions.get(type);
        if (command) return command.execute(payload);
        throw new InternalServerErrorException({
            name: this._name,
            code: 10000,
            message: `${this._name} not found type ${type}`,
        });
    }
}
