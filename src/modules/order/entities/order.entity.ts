/* eslint-disable prettier/prettier */
import { User } from 'src/modules/user/entities';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Discount, Iva, OrderState, PaymentMethod } from '.';
import { OrderBoxes } from './order-boxes.entity';

@Entity({ name: 'tb_order' })
export class Order {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false, type: 'double precision' })
    subtotal: number;

    @Column({ nullable: false, type: 'double precision' })
    total: number;

    @Column({ name: 'delivery_date', nullable: true, type: 'date' })
    deliveryDate: Date;

    @OneToOne((type) => User)
    @JoinColumn({ name: 'id_user' })
    user: User;

    @OneToOne((type) => OrderState)
    @JoinColumn({ name: 'id_state' })
    state: OrderState;

    @OneToOne((type) => PaymentMethod)
    @JoinColumn({ name: 'id_payment_method' })
    paymentMethod: PaymentMethod;

    @OneToOne((type) => Iva)
    @JoinColumn({ name: 'id_iva' })
    iva: Iva;

    @OneToOne((type) => Discount)
    @JoinColumn({ name: 'id_discount' })
    discount: Discount;

    @OneToMany(type => OrderBoxes, orderBoxes => orderBoxes.order)
    orderBoxes: OrderBoxes[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}