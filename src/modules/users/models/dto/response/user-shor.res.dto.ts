import { PickType } from '@nestjs/swagger';

import { UserResBaseDto } from './user-base.res.dto';

export class UserShorResDto extends PickType(UserResBaseDto, ['id', 'name']) {}
