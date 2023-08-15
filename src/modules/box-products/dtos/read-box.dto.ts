import { Exclude, Expose } from 'class-transformer';

import { Category } from 'src/modules/category/category.entity';
import { BoxProductsImage } from '../entities';

@Exclude()
export class ReadBoxProductDto {
  @Expose()
  readonly name: string;

  @Expose()
  readonly price: number;

  @Expose()
  readonly description: string;

  @Expose()
  readonly quantity: number;

  @Expose()
  readonly id: number;

  @Expose()
  readonly isActive: boolean;

  @Expose()
  readonly preparationTime: string;

  @Expose()
  readonly deliveryTime: Date;

  @Expose()
  readonly images: BoxProductsImage[];

  @Expose()
  readonly categories: Category[];
}
