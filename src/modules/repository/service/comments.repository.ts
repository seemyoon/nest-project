import { DataSource, Repository } from 'typeorm';

import { CommentsEntity } from '../../../database/entities/comments.entity';

export class CommentsRepository extends Repository<CommentsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CommentsEntity, dataSource.manager);
  }
}
