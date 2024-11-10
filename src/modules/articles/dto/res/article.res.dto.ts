import { ApiProperty } from '@nestjs/swagger';

import { ArticleID } from '../../../../common/types/entity-ids.type';
import { UserResDto } from '../../../users/models/dto/response/user.res.dto';

export class ArticleResDto {
  @ApiProperty({
    example: '6744s24-5a28-a363-a5e1-023ae2e4780f',
    description: 'Article ID',
  })
  id: ArticleID;

  @ApiProperty({
    example: 'Article Title',
    description: 'Article Title',
  })
  title: string;

  @ApiProperty({
    example: 'Article Description',
    description: 'Article Description',
  })
  description: string;

  @ApiProperty({
    example: 'Article Body',
    description: 'Body Description',
  })
  body: string;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Created field',
  })
  created: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Updated field',
  })
  updated: Date;

  @ApiProperty({
    example: ['tag1', 'tag2'],
    description: 'Article Tags',
  })
  tags: string[];

  user?: UserResDto;
}
