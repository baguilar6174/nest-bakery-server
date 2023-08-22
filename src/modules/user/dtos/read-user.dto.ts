import { Exclude, Expose } from 'class-transformer';
import { Address } from 'src/modules/address/address.entity';
import { Role } from '../../../common/constants';
import { IUser } from '../interfaces/user.interface';

@Exclude()
export class ReadUserDto implements IUser {
  @Expose()
  readonly id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly phone: string;

  @Expose()
  readonly addresses: Address[];

  @Expose()
  readonly role: Role;
}
