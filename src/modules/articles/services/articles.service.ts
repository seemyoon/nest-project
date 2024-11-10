import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In } from 'typeorm';

import { ArticleID } from '../../../common/types/entity-ids.type';
import { ArticleEntity } from '../../../database/entities/article.entity';
import { TagEntity } from '../../../database/entities/tag.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ArticleRepository } from '../../repository/service/article.repository';
import { LikesRepository } from '../../repository/service/likes.repository';
import { TagRepository } from '../../repository/service/tag.repository';
import { CreateArticleReqDto } from '../dto/req/create-article.req.dto';
import { ListArticleQueryDto } from '../dto/req/list-article.query.dto';
import { UpdateArticleReqDto } from '../dto/req/update-article.req.dto';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly articleRepository: ArticleRepository,
    private readonly likeRepository: LikesRepository,
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

  public async findOne(
    userData: IUserData,
    articleId: ArticleID,
  ): Promise<ArticleEntity> {
    return await this.articleRepository.findByArticleId(userData, articleId);
  }

  public async findAll(
    userData: IUserData,
    query: ListArticleQueryDto,
  ): Promise<[ArticleEntity[], number]> {
    return await this.articleRepository.findAll(userData, query);
  }

  public async update(
    userData: IUserData,
    articleId: ArticleID,
    dto: UpdateArticleReqDto,
  ): Promise<ArticleEntity> {
    await this.articleRepository.update(
      { id: articleId, user_id: userData.userId },
      {
        title: dto.title,
        description: dto.description,
        body: dto.body,
      },
    );

    return await this.articleRepository.findOne({
      where: { id: articleId },
      relations: ['tags', 'user'],
    });
  }

  public async like(userData: IUserData, articleId: ArticleID): Promise<void> {
    const article = await this.articleRepository.findOneBy({ id: articleId });
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    const like = await this.likeRepository.findOneBy({
      user_id: userData.userId,
      article_id: articleId,
    });
    if (like) {
      throw new ConflictException('You already likes this post');
    }
    await this.likeRepository.save(
      this.likeRepository.create({
        user_id: userData.userId,
        article_id: articleId,
      }),
    );
  }

  public async unlike(
    userData: IUserData,
    articleId: ArticleID,
  ): Promise<void> {
    const article = await this.articleRepository.findOneBy({
      id: articleId,
    });
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    const like = await this.likeRepository.findOneBy({
      user_id: userData.userId,
      article_id: articleId,
    });
    if (!like) {
      throw new ConflictException('You have not like this article yet');
    }
    await this.likeRepository.remove(like);
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
