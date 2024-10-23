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
import { UserEntity } from './user.entity';
import { CreateUpdateModel } from './models/create-update.model';

@Entity(TableNameEnum.COMMENTS)
export class CommentsEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  body?: string;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.comments)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column()
  article_id: string;
  @ManyToOne(() => ArticleEntity, (entity) => entity.comments)
  @JoinColumn({ name: 'articles_id' })
  articles?: ArticleEntity;
}
