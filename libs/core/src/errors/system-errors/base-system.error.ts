import { InternalServerErrorException } from '@nestjs/common';

export type Metadata = {
    [key: string]: string;
};

export class SystemError extends InternalServerErrorException {
    public readonly isMailing: boolean;
    constructor(message: string, isMailing: boolean) {
        super();
        this.isMailing = isMailing;
        this.message = message;
    }
}

export class DatabaseError extends SystemError {
    constructor(message: string) {
        super(message, false);
    }
}

export class CronJobError extends SystemError {
    constructor(message: string, isMailing = false) {
        super(message, isMailing);
    }
}

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
