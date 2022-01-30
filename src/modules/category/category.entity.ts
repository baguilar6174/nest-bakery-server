/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_category' })
export class Category {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false, unique: true, type: 'varchar', length: 60 })
    name: string;

    @Column({ nullable: false, type: 'varchar', length: 150 })
    description: string;

    @Column({ name: 'is_active', nullable: false, type: 'boolean', default: true })
    isActive: boolean;
}