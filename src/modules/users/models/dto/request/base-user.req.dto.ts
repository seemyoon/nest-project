import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsNotIn,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';

export class BaseUserReqDto {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(0, 300)
  bio?: string;

  @IsOptional()
  @IsString()
  @Length(0, 3000)
  image?: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsString()
  @Length(0, 300)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;

  @ApiProperty({ example: '123qweQWE' })
  @IsNotIn(['password', '123456789', 'qwerty'])
  @IsString()
  @Length(0, 300)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must contain at least 1 letter, 1 number, and be at least 8 characters long',
  })
  public password: string;
}
