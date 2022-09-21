import { Metadata } from '../types';
import { SystemError } from './system.error';

export class DatabaseError extends SystemError {
    constructor(message: string) {
        super(message, false);
    }
}

export class DatabaseEstablishError extends DatabaseError {
    constructor(connectionConfig: string) {
        super(`Establish database connection error with config: ` + connectionConfig);
    }
}

export class DatabaseDuplicateKeyError extends DatabaseError {
    constructor(entity: string, message: string, code: string, metadata?: Metadata) {
        super(
            JSON.stringify(
                {
                    entity,
                    message,
                    code,
                    metadata,
                },
                undefined,
                4,
            ),
        );
    }
}

export class DatabaseQueryError extends DatabaseError {
    constructor(message: string, code: string, metadata?: Metadata) {
        super(
            JSON.stringify(
                {
                    message,
                    code,
                    metadata,
                },
                undefined,
                4,
            ),
        );
    }
}
