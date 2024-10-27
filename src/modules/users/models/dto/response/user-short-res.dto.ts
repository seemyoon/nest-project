import { PickType } from '@nestjs/swagger';

import { UserResBaseDto } from './user-base.res.dto';

export class UserShortResDto extends PickType(UserResBaseDto, ['id', 'name']) {}
