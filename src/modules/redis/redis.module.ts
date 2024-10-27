import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { Config, RedisConfig } from '../../config/config.type';
import { REDIS_CLIENT } from './models/redis.constants';
import { RedisService } from './services/redis.service';

@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: (configService: ConfigService<Config>) => {
        const config = configService.get<RedisConfig>('redis');
        return new Redis({
          host: config.host,
          port: config.port,
          password: config.password,
        });
      },
      inject: [ConfigService],
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
