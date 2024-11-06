import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ArticleID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { ArticleResDto } from './dto/article.res.dto';
import { CreateArticleReqDto } from './dto/create-article.req.dto';
import { UpdateArticleReqDto } from './dto/update-article.req.dto';
import { ArticleMapper } from './services/article.mapper';
import { ArticlesService } from './services/articles.service';

@ApiBearerAuth()
@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateArticleReqDto,
  ): Promise<ArticleResDto> {
    return ArticleMapper.toResDto(
      await this.articlesService.create(userData, dto),
    );
  }

  @Get(':articleId')
  public async findOne(@Param('articleId') articleId: ArticleID) {
    return ArticleMapper.toResDto(
      await this.articlesService.findOne(articleId),
    );
  }

  @Patch(':articleId')
  public async update(
    @CurrentUser() userData: IUserData,
    @Param('articleId') articleId: ArticleID,
    @Body() dto: UpdateArticleReqDto,
  ) {
    return ArticleMapper.toResDto(
      await this.articlesService.update(userData, articleId, dto),
    );
  }
}
