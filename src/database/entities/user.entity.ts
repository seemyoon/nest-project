import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TableNameEnum } from '../enums/table-name.enum';
import { ArticleEntity } from './article.entity';
import { LikesEntity } from './likes.entity';
import { CreateUpdateModel } from './models/create-update.model';
import { RefreshTokenEntity } from './refresh-token.entity';
import { CommentsEntity } from './comments.entity';
import { FollowEntity } from './follow.entity';

@Entity(TableNameEnum.USERS)
export class UserEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  name: string;

  @Column('text')
  password: string;

  @Column('text')
  isActive: boolean;

  @Column('text', { nullable: true })
  isBio: string;

  @Column('text')
  image: string;

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
