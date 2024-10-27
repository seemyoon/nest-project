import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Config, JwtConfig } from '../../../config/config.type';
import { RedisService } from '../../redis/services/redis.service';

@Injectable()
export class AuthCacheService {
  private jwtConfig: JwtConfig;

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.jwtConfig = this.configService.get<JwtConfig>('jwt');
  }

  public async saveToken(
    token: string,
    userId: string,
    deviceId: string,
  ): Promise<void> {
    const key = `ACCESS_TOKEN:${userId}${deviceId}`;
    await this.redisService.addOneToSet(key, token);
    await this.redisService.deleteByKey(key);
    await this.redisService.expire(key, this.jwtConfig.accessExpireIn);
  }
}
