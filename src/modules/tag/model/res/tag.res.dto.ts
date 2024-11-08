import { TagID } from '../../../../common/types/entity-ids.type';

export class TagResDto {
  id: TagID;
  name: string;
  articleCount: number;
}
