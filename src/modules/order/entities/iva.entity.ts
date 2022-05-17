/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_iva' })
export class Iva {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false, type: 'int' })
    percentage: number;

    @Column({ name: 'is_active', nullable: false, type: 'boolean', default: true })
    isActive: boolean;
}