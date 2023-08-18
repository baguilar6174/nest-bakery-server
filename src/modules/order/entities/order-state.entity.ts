import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity({ name: 'tb_order_state' })
export class OrderState extends BaseEntity {
  @Column({ nullable: false, type: 'varchar', length: 20 })
  name: string;
}
