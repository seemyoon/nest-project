import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateReqUserDto } from './dto/request/create-req-user.dto';
import { UpdateReqUserDto } from './dto/request/update-req-user.dto';
import { UserListReqDto } from './dto/request/user-list.req.dto';
import { UserResDto } from './dto/response/user.res.dto';
import { UsersService } from './users.service';
import { UserShorResDto } from './dto/response/user-shor.res.dto';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiConflictResponse({ description: 'Conflict' })
  @ApiOperation({ summary: 'Create user', description: 'Create a new user' })
  @Post()
  public async create(
    @Body() createUserDto: CreateReqUserDto,
    @Query() query: UserListReqDto,
  ): Promise<UserResDto> {
    return await this.usersService.create(createUserDto, query);
  }

  @Get()
  findAll(@Query() query: UserListReqDto) {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateReqUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
