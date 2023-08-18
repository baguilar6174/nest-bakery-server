import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';

import { Address } from 'src/modules/address/address.entity';
import { Role } from '../../../common/enum/roles.enum';
import { BaseEntity } from '../../../common/entities';
import { IUser } from '../interfaces/user.interface';

@Entity({ name: 'tb_user' })
export class User extends BaseEntity implements IUser {
  // nullable: false indicates that the field is required at the DB level.
  @Column({ nullable: false, type: 'text' })
  name: string;

  @Column({ nullable: false, unique: true, type: 'text' })
  email: string;

  @Column({ nullable: false, type: 'text' })
  phone: string;

  @Column({ nullable: false, type: 'text' })
  password: string;

  // A user can have zero or many addresses
  @OneToMany((): typeof Address => Address, (address): User => address.user, {
    cascade: true,
    eager: true,
  })
  addresses: Address[];

  // A user can only have one role admin | user | delivery
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  // * Validations

  @BeforeInsert()
  checkEmailBeforeInsert(): void {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkEmailBeforeUpdate(): void {
    this.checkEmailBeforeInsert();
  }
}
