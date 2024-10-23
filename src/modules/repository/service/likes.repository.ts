import { DataSource, Repository } from 'typeorm';

import { LikesEntity } from '../../../database/entities/likes.entity';

export class LikesRepository extends Repository<LikesEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(LikesEntity, dataSource.manager);
  }
}
