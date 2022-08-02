import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@tommysg/user';
import { ConfigSchema, GeneralConfig, DatabaseConfig } from './config';
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
            load: [GeneralConfig, DatabaseConfig],
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
