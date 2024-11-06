import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { UpdateReqUserDto } from './models/dto/request/update-req-user.dto';
import { UserMapper } from './services/user.mapper';
import { UsersService } from './services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get('me')
  public async findMe(@CurrentUser() userData: IUserData) {
    return UserMapper.toResDto(await this.usersService.findMe(userData));
  }

  @ApiBearerAuth()
  @Patch('me')
  public async updateMe(
    @CurrentUser() userData: IUserData,
    @Body() updateUserDto: UpdateReqUserDto,
  ) {
    return UserMapper.toResDto(
      await this.usersService.updateMe(userData, updateUserDto),
    );
  }

  @ApiBearerAuth()
  @Delete('me')
  public async deleteMe(@CurrentUser() userData: IUserData) {
    return await this.usersService.deleteMe(userData);
  }

  @SkipAuth()
  @Get(':userId')
  public async findOne(@Param('userId', ParseUUIDPipe) userId: UserID) {
    return UserMapper.toResDto(await this.usersService.findUser(userId));
  }

  @ApiBearerAuth()
  @Post(':userId/follow')
  public async follow(
    @Param('userId', ParseUUIDPipe) userId: UserID,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.follow(userData, userId);
  }

  @ApiBearerAuth()
  @Delete(':userId/follow')
  public async unfollow(
    @Param('userId', ParseUUIDPipe) userId: UserID,
    @CurrentUser() userData: IUserData,
  ): Promise<void> {
    await this.usersService.unfollow(userId, userData);
  }
}
