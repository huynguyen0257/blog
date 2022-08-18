import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { SystemError } from '../errors';

@Catch(SystemError)
export class SystemExceptionFilter implements ExceptionFilter {
    catch(exception: SystemError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        // if (!process.env.production) {
        //   Logger.log(`SystemError: ${JSON.stringify(exception, undefined, 4)}`);
        // }
        Logger.error(`url ${request.url} occur error: ${exception.message}`);
        if (exception.isMailing) {
            Logger.warn(`Send mail with error message: ${exception.message}`);
        }

        response.status(status).json({
            ...(exception.getResponse() as object),
            statusCode: status,
        });
    }
}
