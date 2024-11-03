import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserID } from '../../../common/types/entity-ids.type';
import { Config } from '../../../config/config.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { UserRepository } from '../../repository/service/user.repository';
import { UpdateReqUserDto } from '../models/dto/request/update-req-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly userRepository: UserRepository,
  ) {}

  public async findMe(userData: IUserData) {
    return `This action returns a #${userData.userid} user`;
  }

  public async updateMe(userData: IUserData, dto: UpdateReqUserDto) {
    return `This action updates a #${userData.userid} user`;
  }

  public async deleteMe(userData: IUserData) {
    return `This action delete a #${userData.userid} user`;
  }

  public async findUser(userId: UserID) {
    return `This action returns a #${userId} user`;
  }
}
