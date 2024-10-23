import { DataSource, Repository } from 'typeorm';

import { TagEntity } from '../../../database/entities/tag.entity';
import { UserEntity } from '../../../database/entities/user.entity';

export class TagRepository extends Repository<TagEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TagEntity, dataSource.manager);
  }
}
