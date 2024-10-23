import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TableNameEnum } from '../enums/table-name.enum';
import { LikesEntity } from './likes.entity';
import { CreateUpdateModel } from './models/create-update.model';
import { TagEntity } from './tag.entity';
import { UserEntity } from './user.entity';
import { CommentsEntity } from './comments.entity';

@Entity(TableNameEnum.ARTICLES)
export class ArticleEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('text', { nullable: true })
  body?: string;

  @OneToMany(() => LikesEntity, (entity) => entity.articles)
  likes?: LikesEntity[];

  @OneToMany(() => CommentsEntity, (entity) => entity.articles)
  comments?: CommentsEntity[];

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.articles)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @ManyToMany(() => TagEntity, (entity) => entity.articles)
  @JoinTable()
  tag?: TagEntity[];
}
