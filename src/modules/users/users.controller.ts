import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { UserID } from '../../common/types/entity-ids.type';
import { UpdateReqUserDto } from './models/dto/request/update-req-user.dto';
import { UsersService } from './services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get('me')
  public async findMe() {
    return await this.usersService.findMe();
  }

  @ApiBearerAuth()
  @Patch('me')
  public async updateMe(
    @Req() req: Request,
    @Body() updateUserDto: UpdateReqUserDto,
  ) {
    return await this.usersService.updateMe(req.res.locals.user, updateUserDto);
  }

  @ApiBearerAuth()
  @Delete('me')
  public async deleteMe() {
    return await this.usersService.deleteMe();
  }

  @Get(':userId')
  public async findOne(@Param('userId', ParseUUIDPipe) userId: UserID) {
    return await this.usersService.findUser();
  }
}
