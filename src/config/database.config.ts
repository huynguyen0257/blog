import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DatabaseConfig = registerAs('database', () => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    autoLoadEntities: true,
}));

@Injectable()
export class DatabaseConfigService {
    constructor(private configService: ConfigService) {}

    get getConfig(): TypeOrmModuleOptions {
        return this.configService.get('database');
    }
}
