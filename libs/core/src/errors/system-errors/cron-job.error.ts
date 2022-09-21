import { SystemError } from './system.error';

export class CronJobError extends SystemError {
    constructor(message: string, isMailing = false) {
        super(message, isMailing);
    }
}
