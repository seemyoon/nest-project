import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Config } from '../../../config/config.type';
import { UserRepository } from '../../repository/service/user.repository';
import { UpdateReqUserDto } from '../models/dto/request/update-req-user.dto';
import { UserShortResDto } from '../models/dto/response/user-short-res.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService<Config>,
    private userRepository: UserRepository,
  ) {}

  public findAll() {
    this.userRepository.find();
    return `This action returns all users`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  public async update(
    id: number,
    updateUserDto: UpdateReqUserDto,
  ): Promise<UserShortResDto> {
    return {} as UserShortResDto;
  }

  public remove(id: number) {
    return `This action removes a #${id} user`;
  }

  public async checkAbilityToEditArticle(userId: string, articleId: string) {
    // check if the user access to edit the article
  }
}
