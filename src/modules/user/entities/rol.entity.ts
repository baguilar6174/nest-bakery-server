/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserRol } from './userRol.entity';

@Entity({ name: 'tb_rol' })
export class Rol {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false, type: 'varchar', length: 10 })
    name: string;

    // Un usuario puede tener uno o varios roles
    @OneToMany((type) => UserRol, (userRol) => userRol.rol)
    roles: UserRol[];
}