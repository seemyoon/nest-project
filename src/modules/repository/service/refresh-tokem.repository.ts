import { DataSource, Repository } from 'typeorm';

import { CommentsEntity } from '../../../database/entities/comments.entity';
import { RefreshTokenEntity } from '../../../database/entities/refresh-token.entity';

export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RefreshTokenEntity, dataSource.manager);
  }
}
