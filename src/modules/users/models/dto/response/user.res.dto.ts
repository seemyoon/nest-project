import { PickType } from '@nestjs/swagger';

import { UserResBaseDto } from './user-base.res.dto';

export class UserResDto extends PickType(UserResBaseDto, [
  'name',
  'bio',
  'image',
  'email',
  'password',
]) {}
