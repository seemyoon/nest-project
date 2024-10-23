import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { TableNameEnum } from '../enums/table-name.enum';
import { ArticleEntity } from './article.entity';
import { CreateUpdateModel } from './models/create-update.model';

@Entity(TableNameEnum.TAGS)
export class TagEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @ManyToMany(() => ArticleEntity, (entity) => entity.tag)
  @JoinTable()
  articles?: ArticleEntity[];
}
