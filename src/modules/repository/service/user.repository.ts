import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../../database/entities/user.entity';

export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }
}
