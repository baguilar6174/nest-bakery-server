/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_discount' })
export class Discount {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false, type: 'int' })
    percentage: number;

    @Column({ name: 'is_active', nullable: false, type: 'boolean', default: false })
    isActive: boolean;
}