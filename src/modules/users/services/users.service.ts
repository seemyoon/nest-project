import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserID } from '../../../common/types/entity-ids.type';
import { Config } from '../../../config/config.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { FollowRepository } from '../../repository/service/follow.repository';
import { RefreshTokenRepository } from '../../repository/service/refresh-token.repository';
import { UserRepository } from '../../repository/service/user.repository';
import { UpdateReqUserDto } from '../models/dto/request/update-req-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly followRepository: FollowRepository,
  ) {}

  public async findMe(userData: IUserData): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userData.userId });
  }

  public async updateMe(
    userData: IUserData,
    dto: UpdateReqUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    this.userRepository.merge(user, dto);
    return await this.userRepository.save(user);
  }

  public async deleteMe(userData: IUserData): Promise<void> {
    await this.userRepository.update(
      { id: userData.userId },
      { delete: new Date() },
    );
    await this.refreshTokenRepository.delete({ user_id: userData.userId });
  }

  public async findUser(userId: UserID): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userId });
  }

  public async follow(userData: IUserData, userId: UserID) {
    if (userData.userId === userId) {
      throw new ConflictException("You can't unfollow yourself");
    }
    await this.isUserExistOrThrow(userId);
    const follow = await this.followRepository.save({
      follower_id: userData.userId,
      following_id: userId,
    });
    if (!follow) {
      throw new ConflictException("You don't follow this user");
    }
    await this.followRepository.delete({
      follower_id: userData.userId,
      following_id: userId,
    });
  }

  public async unfollow(userId: UserID, userData: IUserData): Promise<void> {
    if (userData.userId === userId) {
      throw new ConflictException("You can't unfollow yourself");
    }
    await this.isUserExistOrThrow(userId);

    const follow = await this.followRepository.findOneBy({
      follower_id: userData.userId,
      following_id: userId,
    });
    if (!follow) {
      throw new ConflictException("You don't follow this user");
    }
    await this.followRepository.delete({
      follower_id: userData.userId,
      following_id: userId,
    });
  }

  private async isUserExistOrThrow(userId: UserID): Promise<void> {
    const user = this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new ConflictException('User not found');
    }
  }
}
