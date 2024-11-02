import { UserEntity } from '../../../database/entities/user.entity';
import { IJwtPayload } from '../../auth/interfaces/jwt-payload.interface';
import { UserResDto } from '../models/dto/response/user.res.dto';

export class UserMapper {
  public static toResDto(user: UserEntity): UserResDto {
    return {
      email: user.email,
      name: user.name,
      password: user.password,
      bio: user.bio,
      image: user.image,
    };
  }

  public static toIUserData(user: UserEntity, jwtPayload: IJwtPayload): any {
    return {
      userId: user.id,
      deviceId: jwtPayload.deviceId,
      email: user.email,
    };
  }
}
