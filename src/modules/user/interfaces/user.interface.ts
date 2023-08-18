import { Role } from '../../../common/enum/roles.enum';
import { IAddress } from '../../address/interfaces/address.interface';

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  addresses: IAddress[];
  role: Role;
}
