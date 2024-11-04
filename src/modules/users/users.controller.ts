import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { UpdateReqUserDto } from './models/dto/request/update-req-user.dto';
import { UsersService } from './services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get('me')
  public async findMe(@CurrentUser() userData: IUserData) {
    return await this.usersService.findMe(userData);
  }

  @ApiBearerAuth()
  @Patch('me')
  public async updateMe(
    @CurrentUser() userData: any,
    @Body() updateUserDto: UpdateReqUserDto,
  ) {
    return await this.usersService.updateMe(userData, updateUserDto);
  }

  @ApiBearerAuth()
  @Delete('me')
  public async deleteMe(@CurrentUser() userData: IUserData) {
    return await this.usersService.deleteMe(userData);
  }

  @Get(':userId')
  public async findOne(@Param('userId', ParseUUIDPipe) userId: UserID) {
    return await this.usersService.findUser(userId);
  }
}
