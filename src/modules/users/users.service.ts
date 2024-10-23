import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfig, Config } from '../../config/config.type';
import { CreateReqUserDto } from './models/dto/request/create-req-user.dto';
import { UpdateReqUserDto } from './models/dto/request/update-req-user.dto';
import { UserListReqDto } from './models/dto/request/user-list.req.dto';
import { UserResDto } from './models/dto/response/user.res.dto';
import { UserShorResDto } from './models/dto/response/user-shor.res.dto';

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigService<Config>) {}

  public async create(
    createUserDto: CreateReqUserDto,
    query: UserListReqDto,
  ): Promise<UserResDto> {
    const appConfig = this.configService.get<AppConfig>('database');
    return {} as UserResDto;
  }

  public findAll() {
    return `This action returns all users`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  public async update(
    id: number,
    updateUserDto: UpdateReqUserDto,
  ): Promise<UserShorResDto> {
    return {} as UserShorResDto;
  }

  public remove(id: number) {
    return `This action removes a #${id} user`;
  }

  public async checkAbilityToEditArticle(userId: string, articleId: string) {
    // check if the user access to edit the article
  }
}
