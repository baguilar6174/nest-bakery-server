import { IUser } from '../../user/interfaces/user.interface';

export interface IAddress {
  addreess: string;
  details: string;
  isActive: boolean;
  user: IUser;
}
