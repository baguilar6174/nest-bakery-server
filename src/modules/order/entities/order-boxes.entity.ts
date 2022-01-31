/* eslint-disable prettier/prettier */
import { BoxProducts } from 'src/modules/box-products/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from '.';

@Entity({ name: 'tb_order_has_box_products' })
export class OrderBoxes {

    @ManyToOne(type => Order, order => order.orderBoxes, { primary: true })
    @JoinColumn({ name: 'id_order' })
    order: Order;

    @ManyToOne(type => BoxProducts, box => box.orderBoxes, { primary: true })
    @JoinColumn({ name: 'id_box_products' })
    box: BoxProducts;

    @Column({ nullable: false, type: 'int' })
    quantity: number;

    @Column({ nullable: false, type: 'double precision' })
    price: number;
}