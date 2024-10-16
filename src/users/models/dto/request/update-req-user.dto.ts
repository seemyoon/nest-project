import { PickType } from '@nestjs/swagger';

import { UserBaseReqDto } from './user-base.req.dto';

export class UpdateReqUserDto extends PickType(UserBaseReqDto, [
  'name',
  'age',
]) {}
