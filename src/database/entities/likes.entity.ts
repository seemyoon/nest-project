import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ArticleID, LikesID, UserID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { ArticleEntity } from './article.entity';
import { UserEntity } from './user.entity';

@Index(['user_id', 'article_id'], { unique: true })
@Entity(TableNameEnum.LIKES)
export class LikesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: LikesID;

  @CreateDateColumn()
  created: Date;

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.likes)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column()
  article_id: ArticleID;
  @ManyToOne(() => ArticleEntity, (entity) => entity.likes)
  @JoinColumn({ name: 'articles_id' })
  article?: ArticleEntity;
}
