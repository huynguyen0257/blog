import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@tommysg/user';
import { ConfigSchema, GeneralConfig, DatabaseConfig, CacheConfig } from './config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
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
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
        }),
        UserModule,
    ],
    controllers: [],
    // TODO: Config Cache Interceptor with graphql
    // providers: [
    //     {
    //         provide: APP_INTERCEPTOR,
    //         useClass: CacheInterceptor,
    //     },
    // ],
})
export class AppModule {}
