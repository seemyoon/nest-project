import { ApiProperty } from '@nestjs/swagger';

export class CreateReqUserDto {
  @ApiProperty({ example: 'sasha', description: 'set your name' })
  readonly name: string;
  @ApiProperty({ example: '23', description: 'set your age' })
  readonly age: number;
  @ApiProperty({ example: 'sasha2001@gmail.com', required: false })
  readonly email: string;
  readonly password: string;
  @ApiProperty({ example: ['admin', 'user'] })
  readonly role: string;
}
