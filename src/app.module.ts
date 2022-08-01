import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@tommysg/user';
import { join } from 'path';
import { getConnectionOptions } from 'typeorm';
import { envConfig, ConfigSchema } from './config';
import { TransformInterceptor } from './interceptor';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => {
                return Object.assign(await getConnectionOptions(), {
                    autoLoadEntities: true,
                    entities: [join(__dirname, 'libs', '**', '*.entity.ts')],
                });
            },
        }),
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
            load: [envConfig],
            validationSchema: ConfigSchema,
            validationOptions: {
                allowUnknown: true,
                abortEarly: true,
            },
        }),
        // CacheModule.register<ClientOpts>({
        //     store: redisStore,
        //     password: 'dev@123',
        //     db: 3,
        //     ttl: 0,
        //     isGlobal: true,
        //     max: 10,
        // }),
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
