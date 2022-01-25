/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_order_state' })
export class OrderState {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false, type: 'varchar', length: 20 })
    name: string;
}