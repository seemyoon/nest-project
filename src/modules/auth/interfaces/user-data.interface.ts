import { UserID } from '../../../common/types/entity-ids.type';

export interface IUserData {
  userid: UserID;
  deviceId: string;
  email: string;
}
