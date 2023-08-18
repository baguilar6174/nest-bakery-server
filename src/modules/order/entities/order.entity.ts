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

import { BaseEntity } from '../../../common/entities/base.entity';
import { OrderState, PaymentMethod } from '../../../common/enum';

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

  @Column({ type: 'enum', enum: OrderState, default: OrderState.PENDING })
  state: OrderState;

  @Column({ type: 'enum', enum: PaymentMethod, nullable: false })
  paymentMethod: PaymentMethod;

  @Column({ type: 'double precision', default: 12 })
  iva: number;

  @Column({ type: 'double precision', default: 0 })
  discount: number;

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
