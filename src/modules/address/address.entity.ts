import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/modules/user/entities';

@Entity({ name: 'tb_address' })
export class Address {
  @PrimaryGeneratedColumn('increment')
  id: number;

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_user' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
