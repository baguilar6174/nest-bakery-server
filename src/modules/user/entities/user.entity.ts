/* eslint-disable prettier/prettier */
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Address } from 'src/modules/address/address.entity';
import { Schedule } from 'src/modules/schedule/schedule.entity';
import { Role } from '.';

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
    @OneToMany((type) => Address, (address) => address.user, { cascade: true, eager: true })
    addresses: Address[];

    // Un usuario puede tener cero o muchos horarios
    @OneToMany((type) => Schedule, (schedule) => schedule.user)
    schedules: Schedule[];

    // Un usuario puede tener uno o varios roles
    @ManyToMany((type) => Role, {cascade: true, eager: true })
    @JoinTable({
        name: 'tb_user_has_role',
        joinColumn: {
            name: 'id_user',
            referencedColumnName: 'id'
        },
        inverseJoinColumn : {
            name: 'id_role',
            referencedColumnName: 'id'
        },
    })
    roles: Role[]

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}