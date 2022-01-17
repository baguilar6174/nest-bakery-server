/* eslint-disable prettier/prettier */
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { BoxProductsImage } from '../box-products-image/box-products-image.entiy';
import { Category } from '../category/category.entity';

@Entity({ name: 'tb_box_products' })
export class BoxProducts {

    @PrimaryGeneratedColumn('increment')
    id: number;

    // nullable: false indica que el campo es requerido a nivel de BD
    @Column({ nullable: false, type: 'varchar', length: 50 })
    name: string;

    @Column({ nullable: false, type: 'double precision' })
    price: number;

    @Column({ nullable: false, type: 'varchar', length: 150 })
    description: string;

    @Column({ name: 'is_active', nullable: false, type: 'boolean', default: false })
    isActive: boolean;

    @Column({ nullable: false, type: 'int' })
    quantity: boolean;

    @Column({ name: 'praparation_time', nullable: false, type: 'varchar', length: 10 })
    praparationTime: string;

    @Column({ name: 'delivery_time', nullable: false, type: 'date' })
    deliveryTime: Date;

    // Una caja puede tener una o varias imagenes
    @OneToMany((type) => BoxProductsImage, (boxProductsImage) => boxProductsImage.boxProduct)
    images: BoxProductsImage[];

    // Una caja puede tener una o varias categorías
    @ManyToMany((type) => Category, {cascade: true, eager: false })
    @JoinTable({
        name: 'tb_box_products_has_category',
        joinColumn: {
            name: 'id_box_products',
            referencedColumnName: 'id'
        },
        inverseJoinColumn : {
            name: 'id_category',
            referencedColumnName: 'id'
        },
    })
    categories: Category[]

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}