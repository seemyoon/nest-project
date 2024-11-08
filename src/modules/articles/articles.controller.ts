import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ArticleID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CreateArticleReqDto } from './dto/req/create-article.req.dto';
import { ListArticleQueryDto } from './dto/req/list-article.query.dto';
import { UpdateArticleReqDto } from './dto/req/update-article.req.dto';
import { ArticleResDto } from './dto/res/article.res.dto';
import { ArticleListResDto } from './dto/res/article-list.res.dto';
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
    const result = await this.articlesService.create(userData, dto);
    return ArticleMapper.toResDto(result);
  }

  @Get(':articleId')
  public async findOne(
    @Param('articleId') articleId: ArticleID,
  ): Promise<ArticleResDto> {
    return ArticleMapper.toResDto(
      await this.articlesService.findOne(articleId),
    );
  }

  @Get()
  public async findAll(
    @CurrentUser() userData: IUserData,
    @Query() query: ListArticleQueryDto,
  ): Promise<ArticleListResDto> {
    const [entities, total] = await this.articlesService.findAll(
      userData,
      query,
    );
    return ArticleMapper.toResDtoList(entities, total, query);
  }

  @Patch(':articleId')
  public async update(
    @CurrentUser() userData: IUserData,
    @Param('articleId') articleId: ArticleID,
    @Body() dto: UpdateArticleReqDto,
  ): Promise<ArticleResDto> {
    return ArticleMapper.toResDto(
      await this.articlesService.update(userData, articleId, dto),
    );
  }
}
