import { Exclude, Expose } from 'class-transformer';
import { Address } from 'src/modules/address/address.entity';
import { Role } from '../../../common/constants';

@Exclude()
export class ReadUserDto {
  @Expose()
  readonly id: number;

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
