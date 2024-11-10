import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsString, Length } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class BaseArticleReqDto {
  @ApiProperty({ example: 'My Favorite Dishes' })
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  title: string;

  @ApiProperty({ example: 'My Favorite Dishes' })
  @IsString()
  @Length(0, 200)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  description: string;

  @ApiProperty({
    example:
      'This section contains an in-depth look at some of my favorite dishes. ',
  })
  @IsString()
  @Length(0, 200)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  body: string;

  @ApiProperty({
    example: ['banana', 'chicken', 'dessert', 'quick meals', 'dinner'],
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsString({ each: true })
  @Length(3, 20, { each: true })
  @ArrayMaxSize(6)
  tags: string[];
}
