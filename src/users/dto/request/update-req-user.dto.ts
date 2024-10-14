import { PartialType } from '@nestjs/mapped-types';

import { CreateReqUserDto } from './create-req-user.dto';

export class UpdateReqUserDto extends PartialType(CreateReqUserDto) {}
