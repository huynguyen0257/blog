import { InternalServerErrorException } from '@nestjs/common';
import { Allow, IsNotEmpty, IsString, validateOrReject } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class DomainValidationError extends InternalServerErrorException {
    constructor(entity: string, error?: Error) {
        super(
            {
                ...error,
                error: 'VALIDATION-ERR:70000',
            },
            `Validate Constrain ${entity}`,
        );
    }
}

/**
 * Use @Allow decorator for private props
 */
export abstract class BaseEntity<Key extends string, Props> {
    @IsString()
    @IsNotEmpty()
    protected _id: Key;
    @Allow()
    protected _props: Props;
    @Allow()
    protected abstract _name: string;

    constructor(id?: Key, props?: Props) {
        this._id = id || uuidv4();
        this._props = props || ({} as any);
    }

    @IsNotEmpty()
    public get id(): Key {
        return this._id;
    }

    @Allow()
    public get props(): Props {
        return this._props;
    }

    protected async validate() {
        try {
            await validateOrReject(this, { whitelist: true });
        } catch (error) {
            throw new DomainValidationError(this._name, error);
        }
    }
}
