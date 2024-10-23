import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TableNameEnum } from '../enums/table-name.enum';
import { ArticleEntity } from './article.entity';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.FOLLOW)
export class FollowEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column()
  follower_id: string;

  @ManyToOne(() => UserEntity, (entity) => entity.follower_id)
  @JoinColumn({ name: 'follower_id' })
  follower?: UserEntity;

  @Column()
  following_id: string;

  @ManyToOne(() => UserEntity, (entity) => entity.following_id)
  @JoinColumn({ name: 'following_id' })
  following?: UserEntity;
}
