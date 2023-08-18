import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Address } from 'src/modules/address/address.entity';
import { Schedule } from 'src/modules/schedule/schedule.entity';

@Entity({ name: 'tb_user' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // nullable: false indica que el campo es requerido a nivel de BD
  @Column({ nullable: false, type: 'varchar', length: 50 })
  name: string;

  @Column({ nullable: false, unique: true, type: 'varchar', length: 50 })
  email: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  phone: string;

  @Column({ nullable: false, type: 'varchar', length: 65 })
  password: string;

  // Un usuario puede tener cero o muchas direcciones
  @OneToMany(() => Address, (address) => address.user, {
    cascade: true,
    eager: true,
  })
  addresses: Address[];

  // Un usuario puede tener cero o muchos horarios
  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedules: Schedule[];

  // A user can only have one role admin | user | delivery
  @Column({ nullable: false, type: 'text' })
  role: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  checkEmailBeforeInsert(): void {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkEmailBeforeUpdate(): void {
    this.checkEmailBeforeInsert();
  }
}
