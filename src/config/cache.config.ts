import { Injectable } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';

export const CacheConfig = registerAs<RedisClientOptions>('cache', () => ({
    store: redisStore,
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: process.env.REDIS_PASSWORD,
    database: 3,
    ttl: 0,
    isGlobal: true,
    max: 100,
}));

@Injectable()
export class CacheConfigService {
    constructor(private configService: ConfigService) {}

    get getConfig(): RedisClientOptions {
        return this.configService.get('cache');
    }
}
