import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity({ name: 'tb_payment_method' })
export class PaymentMethod extends BaseEntity {
  @Column({ nullable: false, type: 'varchar', length: 20 })
  name: string;
}
