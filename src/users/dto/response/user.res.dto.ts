import { PickType } from '@nestjs/swagger';

import { UserResBaseDto } from './user-base.res.dto';

export class UserResDto extends PickType(UserResBaseDto, [
  'id',
  'name',
  'age',
  'email',
  'role',
  'created_at',
  'updates_at',
]) {}
