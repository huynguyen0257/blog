import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseConfigType } from './config';
import { TransformInterceptor } from './interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Env config
    const configService = app.get(ConfigService);
    const globalPrefix = configService.get('api_prefix');
    const databaseConfig = configService.get<DatabaseConfigType>('database');
    Logger.log(`🔌 databaseConfig: ${JSON.stringify(databaseConfig, undefined, 4)}`);

    // Rest config
    app.setGlobalPrefix(globalPrefix);
    // app.useGlobalFilters(new SystemExceptionFilter());
    // Customize response object
    app.useGlobalInterceptors(new TransformInterceptor())
    // Validation and transforming request
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidUnknownValues: true,
            transform: true,
        }),
    );

    // Start app
    const port = process.env.PORT || 3333;
    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();
