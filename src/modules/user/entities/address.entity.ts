/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User } from './user.entity';

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

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;    
}