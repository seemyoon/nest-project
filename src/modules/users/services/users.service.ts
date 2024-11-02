import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserID } from '../../../common/types/entity-ids.type';
import { Config } from '../../../config/config.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { UserRepository } from '../../repository/service/user.repository';
import { UpdateReqUserDto } from '../models/dto/request/update-req-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly userRepository: UserRepository,
  ) {}

  public async findMe() {
    return `This action returns a #${1} user`;
  }

  public async updateMe(userData: UserEntity, dto: UpdateReqUserDto) {
    return `This action updates a #${userData.id} user`;
  }

  public async deleteMe(userId: UserID) {
    return `This action delete a #${userId} user`;
  }

  public async findUser(userId: UserID) {
    return `This action returns a #${userId} user`;
  }
}
