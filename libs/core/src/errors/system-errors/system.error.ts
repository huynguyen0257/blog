import { InternalServerErrorException } from '@nestjs/common';

export class SystemError extends InternalServerErrorException {
    public readonly isMailing: boolean;
    constructor(message: string, isMailing: boolean) {
        super();
        this.isMailing = isMailing;
        this.message = message;
    }
}
