import { PickType } from '@nestjs/swagger';

import { UserResBaseDto } from './user-base.res.dto';

export class UserResDto extends PickType(UserResBaseDto, [
  'id',
  'name',
  'bio',
  'image',
  'email',
  'isFollowed',
]) {}
