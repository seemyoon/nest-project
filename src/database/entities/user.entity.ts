import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { ArticleEntity } from './article.entity';
import { CommentsEntity } from './comments.entity';
import { FollowEntity } from './follow.entity';
import { LikesEntity } from './likes.entity';
import { CreateUpdateModel } from './models/create-update.model';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity(TableNameEnum.USERS)
export class UserEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: UserID;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  name: string;

  @Column('text', { select: false })
  password: string;

  @Column('text', { nullable: true })
  bio: string;

  @Column('text', { nullable: true })
  image: string;

  @Column('timestamp', { nullable: true })
  delete: Date;

  @OneToMany(() => CommentsEntity, (entity) => entity.user)
  comments?: CommentsEntity[];

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => ArticleEntity, (entity) => entity.user)
  articles?: ArticleEntity[];

  @OneToMany(() => LikesEntity, (entity) => entity.user)
  likes?: LikesEntity[];

  @OneToMany(() => FollowEntity, (entity) => entity.follower_id)
  follower_id?: CommentsEntity[];

  @OneToMany(() => FollowEntity, (entity) => entity.following_id)
  following_id?: CommentsEntity[];
}
