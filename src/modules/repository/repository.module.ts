import { Global, Module } from '@nestjs/common';

import { UserRepository } from './service/user.repository';
import { ArticleRepository } from './service/article.repository';
import { CommentsRepository } from './service/comments.repository';
import { FollowRepository } from './service/follow.repository';
import { LikesRepository } from './service/likes.repository';
import { RefreshTokenRepository } from './service/refresh-tokem.repository';
import { TagRepository } from './service/tag.repository';

const repository = [
  UserRepository,
  ArticleRepository,
  CommentsRepository,
  FollowRepository,
  LikesRepository,
  RefreshTokenRepository,
  TagRepository,
  UserRepository,
];

@Global()
@Module({
  providers: [...repository],
  exports: [...repository],
})
export class RepositoryModule {}
