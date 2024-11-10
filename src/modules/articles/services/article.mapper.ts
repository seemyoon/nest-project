import { Injectable } from '@nestjs/common';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { UserMapper } from '../../users/services/user.mapper';
import { ListArticleQueryDto } from '../dto/req/list-article.query.dto';
import { ArticleResDto } from '../dto/res/article.res.dto';
import { ArticleListResDto } from '../dto/res/article-list.res.dto';

@Injectable()
export class ArticleMapper {
  public static toResDto(data: ArticleEntity): ArticleResDto {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      body: data.body,
      created: data.created,
      updated: data.updated,
      isLiked: data.likes?.length >= 0,
      tags: data.tags ? data.tags.map((tag) => tag.name) : [],
      user: data.user ? UserMapper.toResDto(data.user) : null,
    };
  }

  public static toResDtoList(
    data: ArticleEntity[],
    total: number,
    query: ListArticleQueryDto,
  ): ArticleListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }
}
