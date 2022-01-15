/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Schedule, UserRol } from '.';
import { Address } from './address.entity';

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
    @OneToMany((type) => Address, (address) => address.user)
    addresses: Address[];

    // Un usuario puede tener cero o muchos horarios
    @OneToMany((type) => Schedule, (schedule) => schedule.user)
    schedules: Schedule[];

    // Un usuario puede tener uno o varios roles
    @OneToMany((type) => UserRol, (userRol) => userRol.rol)
    roles: UserRol[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;    
}