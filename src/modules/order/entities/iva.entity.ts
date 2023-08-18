import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity({ name: 'tb_iva' })
export class Iva extends BaseEntity {
  @Column({ nullable: false, type: 'int' })
  percentage: number;

  @Column({
    name: 'is_active',
    nullable: false,
    type: 'boolean',
    default: true,
  })
  isActive: boolean;
}
