import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BoxProducts } from '.';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity({ name: 'tb_box_products_image' })
export class BoxProductsImage extends BaseEntity {
  @Column({ nullable: false, type: 'text' })
  url: string;

  @ManyToOne(() => BoxProducts, (boxProducts) => boxProducts.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_box_products' })
  boxProduct: BoxProducts;
}
