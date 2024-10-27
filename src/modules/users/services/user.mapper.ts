import { UserEntity } from '../../../database/entities/user.entity';
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
}
