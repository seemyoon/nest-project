import { PickType } from '@nestjs/swagger';

import { UserResBaseDto } from './user-base.res.dto';

export class UserResDto extends PickType(UserResBaseDto, [
  'name',
  'age',
  'email',
  'phone',
  'gender',
  'isStudent',
  'cars',
  'created_at',
  'updated_at',
]) {}
