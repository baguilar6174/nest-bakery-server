/* eslint-disable prettier/prettier */
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Rol, User } from '.';

@Entity({ name: 'tb_user_has_rol' })
export class UserRol {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne((type) => Rol, (rol) => rol.roles, { cascade: true, eager: true })
    @JoinColumn({ name: 'id_rol' })
    rol: Rol;

    @ManyToOne((type) => User, (user) => user.roles, { cascade: true, eager: true })
    @JoinColumn({ name: 'id_user' })
    user: User;
}