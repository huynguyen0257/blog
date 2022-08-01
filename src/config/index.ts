export * from './config-schema';
export * from './database.config';
export * from './inject-token.enum';
import { DatabaseConfig } from './database.config';

export function envConfig() {
    return {
        port: parseInt(process.env.PORT, 10) || 3000,
        api_prefix: process.env.API_PREFIX || '',
        [DatabaseConfig.constructor.name]: DatabaseConfig,
    };
}
