/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/modules/user/entities';

@Entity({ name: 'tb_address' })
export class Address {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false, type: 'varchar', length: 60 })
    addreess: string;

    @Column({ nullable: false, type: 'varchar', length: 100 })
    details: string;

    @Column({ nullable: false, type: 'boolean', default: false })
    isActive: boolean;

    @ManyToOne((type) => User, (user) => user.addresses, { cascade: true, eager: true })
    @JoinColumn({ name: 'id_user' })
    user: User;

    // @CreateDateColumn({ name: 'created_at' })
    // createdAt: Date;

    // @UpdateDateColumn({ name: 'updated_at' })
    // updatedAt: Date;
}