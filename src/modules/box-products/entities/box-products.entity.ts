import { Category } from 'src/modules/category/category.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BoxProductsImage } from '.';
import { BaseEntity } from '../../../common/entities';

@Entity({ name: 'tb_box_products' })
export class BoxProducts extends BaseEntity {
  // nullable: false indica que el campo es requerido a nivel de BD
  @Column({ nullable: false, type: 'varchar', length: 100 })
  name: string;

  @Column({ nullable: false, type: 'double precision' })
  price: number;

  @Column({ nullable: false, type: 'varchar', length: 500 })
  description: string;

  @Column({
    name: 'is_active',
    nullable: false,
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @Column({ nullable: false, type: 'int' })
  quantity: number;

  @Column({
    name: 'preparation_time',
    nullable: false,
    type: 'varchar',
    length: 10,
    default: '24h',
  })
  preparationTime: string;

  @Column({ name: 'delivery_time', nullable: true, type: 'date' })
  deliveryTime: Date;

  // Una caja puede tener una o varias imagenes
  @OneToMany(
    () => BoxProductsImage,
    (boxProductsImage) => boxProductsImage.boxProduct,
    { eager: true, cascade: ['insert', 'update'] },
  )
  images: BoxProductsImage[];

  // Una caja puede tener una o varias categorías
  @ManyToMany(() => Category, { cascade: true, eager: true })
  @JoinTable({
    name: 'tb_box_products_has_category',
    joinColumn: {
      name: 'id_box_products',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_category',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];
}
