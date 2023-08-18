import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { User } from 'src/modules/user/entities';
import { IAddress } from './interfaces/address.interface';
import { BaseEntity } from '../../common/entities';

@Entity({ name: 'tb_address' })
export class Address extends BaseEntity implements IAddress {
  @Column({ nullable: false, type: 'varchar', length: 150 })
  addreess: string;

  @Column({ nullable: false, type: 'varchar', length: 250 })
  details: string;

  @Column({
    name: 'is_active',
    nullable: false,
    type: 'boolean',
    default: false,
  })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_user' })
  user: User;
}
