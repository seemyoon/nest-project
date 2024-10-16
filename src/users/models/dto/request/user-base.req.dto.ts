import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotIn,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import { GenderEnum } from '../../enum/gender.enum';
import { Transform, Type } from 'class-transformer';
import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class CarsBaseReqDto {
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @ApiProperty({ example: 'bmw' })
  @Length(2, 35)
  @IsString()
  public model: string;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @Length(4, 35)
  @IsString()
  public producer: string;

  @ApiProperty({ example: 2013 })
  @Type(() => Number)
  @Min(1900)
  @IsInt()
  public year: number;
}

export class UserBaseReqDto {
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @Length(4, 40)
  public name: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(150)
  @IsOptional()
  public age?: number;

  @Transform(TransformHelper.trim)
  @ApiProperty({ example: '+380000000000' })
  @ValidateIf((object) => !object.email)
  @IsInt()
  public phone: string;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @ApiProperty({ example: 'name@gmail.com' })
  @ValidateIf((object) => !object.phone)
  @IsString()
  public email: string;

  @IsOptional()
  @IsEnum(GenderEnum)
  public gender: GenderEnum;

  @Transform(TransformHelper.trim)
  @ApiProperty({ example: '123qweASD' })
  @IsNotIn(['password', '123456789', 'qwerty'])
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password must contain at least 1 letter, 1 number, and be at least 8 characters long',
  })
  public password: string;

  @IsOptional()
  @IsBoolean()
  public isStudent?: boolean = false;

  @IsArray()
  @Type(() => CarsBaseReqDto)
  @ValidateNested({ each: true })
  public cars: CarsBaseReqDto[];
}
