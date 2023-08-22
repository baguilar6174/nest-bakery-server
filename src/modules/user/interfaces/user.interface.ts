import { Role } from '../../../common/constants';
import { IAddress } from '../../address/interfaces/address.interface';

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: IAddress[];
  role: Role;
}
