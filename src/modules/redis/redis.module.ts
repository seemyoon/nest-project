import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

import { Config, RedisConfig } from '../../config/config.type';

@Module({
  providers: [
    {
      provide: 'REDIS',
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
  ],
})
export class RedisModule {}
