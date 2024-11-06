import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  ArticleID,
  CommentsID,
  UserID,
} from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { ArticleEntity } from './article.entity';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.COMMENTS)
export class CommentsEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: CommentsID;

  @Column('text', { nullable: true })
  body?: string;

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column()
  article_id: ArticleID;
  @ManyToOne(() => ArticleEntity, (entity) => entity.comments, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'articles_id' })
  articles?: ArticleEntity;
}
