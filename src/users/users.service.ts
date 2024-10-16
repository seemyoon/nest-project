import { Injectable } from '@nestjs/common';

import { CreateReqUserDto } from './models/dto/request/create-req-user.dto';
import { UpdateReqUserDto } from './models/dto/request/update-req-user.dto';
import { UserListReqDto } from './models/dto/request/user-list.req.dto';
import { UserResDto } from './models/dto/response/user.res.dto';
import { UserShorResDto } from './models/dto/response/user-shor.res.dto';

@Injectable()
export class UsersService {
  public async create(
    createUserDto: CreateReqUserDto,
    query: UserListReqDto,
  ): Promise<UserResDto> {
    return {} as UserResDto;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  public async update(
    id: number,
    updateUserDto: UpdateReqUserDto,
  ): Promise<UserShorResDto> {
    return {} as UserShorResDto;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  public async checkAbilityToEditArticle(userId: string, articleId: string) {
    // check if the user access to edit the article
  }
}
