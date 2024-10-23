import { DataSource, Repository } from 'typeorm';

import { ArticleEntity } from '../../../database/entities/article.entity';
import { FollowEntity } from '../../../database/entities/follow.entity';

export class FollowRepository extends Repository<FollowEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(FollowEntity, dataSource.manager);
  }
}
