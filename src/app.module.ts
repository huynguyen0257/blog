import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@tommysg/user';
import { ConfigSchema, GeneralConfig, DatabaseConfig, CacheConfig } from './config';
import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
            load: [GeneralConfig, DatabaseConfig, CacheConfig],
            validationSchema: ConfigSchema,
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                return configService.get('database');
            },
            inject: [ConfigService],
        }),
        CacheModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return configService.get('cache');
            },
            inject: [ConfigService],
        }),
        UserModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export class AppModule {}
