import { Injectable } from '@nestjs/common';

import { CreateReqUserDto } from './dto/request/create-req-user.dto';
import { UpdateReqUserDto } from './dto/request/update-req-user.dto';
import { UserListReqDto } from './dto/request/user-list.req.dto';
import { UserResDto } from './dto/response/user.res.dto';

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

  update(id: number, updateUserDto: UpdateReqUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  public async checkAbilityToEditArticle(userId: string, articleId: string) {
    // check if the user access to edit the article
  }
}
