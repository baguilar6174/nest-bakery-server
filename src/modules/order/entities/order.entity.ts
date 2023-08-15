import { BoxProducts } from 'src/modules/box-products/entities';
import { User } from 'src/modules/user/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Discount, Iva, OrderState, PaymentMethod } from '.';

@Entity({ name: 'tb_order' })
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, type: 'double precision' })
  subtotal: number;

  @Column({ nullable: false, type: 'double precision' })
  total: number;

  @Column({ nullable: false, type: 'int' })
  quantity: number;

  @Column({ name: 'delivery_date', nullable: true, type: 'date' })
  deliveryDate: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => User, { eager: true })
  @JoinColumn({ name: 'id_user' })
  user: User;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => OrderState, { nullable: false, eager: true })
  @JoinColumn({ name: 'id_state' })
  state: OrderState;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => PaymentMethod, { nullable: false, eager: true })
  @JoinColumn({ name: 'id_payment_method' })
  paymentMethod: PaymentMethod;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => Iva, { nullable: false })
  @JoinColumn({ name: 'id_iva' })
  iva: Iva;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => Discount, { nullable: false })
  @JoinColumn({ name: 'id_discount' })
  discount: Discount;

  // Una caja puede tener una o varias categorías
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany((_type) => BoxProducts, { cascade: true, eager: true })
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
