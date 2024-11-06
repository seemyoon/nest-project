import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import { ArticleID } from '../../../common/types/entity-ids.type';
import { ArticleEntity } from '../../../database/entities/article.entity';
import { TagEntity } from '../../../database/entities/tag.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ArticleRepository } from '../../repository/service/article.repository';
import { TagRepository } from '../../repository/service/tag.repository';
import { CreateArticleReqDto } from '../dto/create-article.req.dto';
import { UpdateArticleReqDto } from '../dto/update-article.req.dto';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly articleRepository: ArticleRepository,
  ) {}

  public async create(
    userData: IUserData,
    dto: CreateArticleReqDto,
  ): Promise<ArticleEntity> {
    const tags = await this.createTags(dto.tags);
    return await this.articleRepository.save(
      this.articleRepository.create({ ...dto, tags, user_id: userData.userId }),
    );
  }

  public async findOne(articleId: ArticleID): Promise<ArticleEntity> {
    return {} as any;
  }

  public async update(
    userData: IUserData,
    articleId: ArticleID,
    dto: UpdateArticleReqDto,
  ): Promise<ArticleEntity> {
    return {} as any;
  }

  private async createTags(tags: string[]): Promise<TagEntity[]> {
    if (!tags || !tags.length) return [];

    const tagEntities = await this.tagRepository.findBy({ name: In(tags) });
    const existingTags = tagEntities.map((tag) => tag.name);
    const newTags = tags.filter((tag) => !existingTags.includes(tag));
    const newEntities = await this.tagRepository.save(
      newTags.map((tag) => this.tagRepository.create({ name: tag })),
    );
    return [...tagEntities, ...newEntities];
  }

  // remove(id: number) {
  //   return `This action removes a #${id} article`;
  // }
}
