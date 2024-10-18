import { CarsBaseReqDto } from '../request/user-base.req.dto';

export class UserResBaseDto {
  id: string;
  name: number;
  age?: number;
  email: string;
  phone: string;
  gender: string;
  isStudent: string;
  cars: CarsBaseReqDto[];
  created_at: Date;
  updated_at: Date;
}
