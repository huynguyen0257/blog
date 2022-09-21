import { Metadata } from '../types';
import { SystemError } from './system.error';

export class ExternalApiError extends SystemError {
    constructor(
        url: string,
        message: string,
        code: string,
        isMailing: boolean,
        metadata?: Metadata,
    ) {
        message = JSON.stringify(
            {
                url,
                message,
                code,
                metadata,
            },
            undefined,
            4,
        );
        super(message, isMailing);
    }
}
