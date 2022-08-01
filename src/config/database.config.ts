import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type DatabaseConfigType = {
    host: string;
    port: number;
};

export const DatabaseConfig: DatabaseConfigType = Object.freeze({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
});

@Injectable()
export class DatabaseConfigService {
    constructor(private configService: ConfigService) {}

    get getConfig(): DatabaseConfigType {
        return this.configService.get(DatabaseConfig.constructor.name);
    }
}
