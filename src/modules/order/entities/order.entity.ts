import { BoxProducts } from 'src/modules/box-products/entities';
import { User } from 'src/modules/user/entities';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Discount, Iva, OrderState, PaymentMethod } from '.';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity({ name: 'tb_order' })
export class Order extends BaseEntity {
  @Column({ nullable: false, type: 'double precision' })
  subtotal: number;

  @Column({ nullable: false, type: 'double precision' })
  total: number;

  @Column({ nullable: false, type: 'int' })
  quantity: number;

  @Column({ name: 'delivery_date', nullable: true, type: 'date' })
  deliveryDate: Date;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => OrderState, { nullable: false, eager: true })
  @JoinColumn({ name: 'id_state' })
  state: OrderState;

  @ManyToOne(() => PaymentMethod, { nullable: false, eager: true })
  @JoinColumn({ name: 'id_payment_method' })
  paymentMethod: PaymentMethod;

  @ManyToOne(() => Iva, { nullable: false })
  @JoinColumn({ name: 'id_iva' })
  iva: Iva;

  @ManyToOne(() => Discount, { nullable: false })
  @JoinColumn({ name: 'id_discount' })
  discount: Discount;

  // Una caja puede tener una o varias categorías
  @ManyToMany(() => BoxProducts, { cascade: true, eager: true })
  @JoinTable({
    name: 'tb_order_has_box_products',
    joinColumn: {
      name: 'id_order',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_box_products',
      referencedColumnName: 'id',
    },
  })
  boxes: BoxProducts[];
}
