import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class ListArticleQueryDto {
  @Type(() => Number)
  @Max(100)
  @Min(1)
  @IsInt()
  @IsOptional()
  limit?: number = 10;

  @Type(() => Number)
  @Min(0)
  @IsInt()
  @IsOptional()
  offset?: number = 0;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsOptional()
  @IsString()
  search?: string;

  @Transform(TransformHelper.trim)
  @IsOptional()
  @IsString()
  tag?: string;
}
