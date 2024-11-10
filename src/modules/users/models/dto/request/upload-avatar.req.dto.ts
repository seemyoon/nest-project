import { ApiProperty } from '@nestjs/swagger';

export class UploadAvatarReqDto {
  @ApiProperty({ type: 'string', format: 'string' })
  avatar: any;
}
