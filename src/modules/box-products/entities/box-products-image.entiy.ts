/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BoxProducts } from '.';

@Entity({ name: 'tb_box_products_image' })
export class BoxProductsImage {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false, type: 'text' })
    url: string;

    @ManyToOne((type) => BoxProducts, (boxProducts) => boxProducts.images, {  onDelete: "CASCADE" })
    @JoinColumn({ name: 'id_box_products' })
    boxProduct: BoxProducts;

}