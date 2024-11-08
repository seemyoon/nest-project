import { TagEntity } from '../../../database/entities/tag.entity';
import { TagResDto } from '../model/res/tag.res.dto';

export class TagMapper {
  public static toResListDto(data: TagEntity[]): TagResDto[] {
    return data.map(this.toResDto);
  }

  public static toResDto(data: TagEntity): TagResDto {
    return {
      id: data.id,
      name: data.name,
      articleCount: data.articleCount || 0,
    };
  }
}
