import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { CreateArticleReqDto } from './dto/create-article.req.dto';
import { UpdateArticleReqDto } from './dto/update-article.req.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly userService: UsersService) {}

  create(dto: CreateArticleReqDto) {
    this.userService.checkAbilityToEditArticle('userId', 'articleId');
    return 'This action adds a new article';
  }

  findAll() {
    return `This action returns all articles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, dto: UpdateArticleReqDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
