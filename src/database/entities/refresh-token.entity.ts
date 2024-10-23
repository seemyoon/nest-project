import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';
import { TableNameEnum } from '../enums/table-name.enum';

@Entity(TableNameEnum.REFRESH_TOKENS)
export class RefreshTokenEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  refreshToken: string;

  @Column()
  deviceId: string;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.refreshTokens)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
