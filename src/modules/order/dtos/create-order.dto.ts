import {
  ArrayNotEmpty,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { BoxProducts } from 'src/modules/box-products/entities';
import { User } from 'src/modules/user/entities';
import { PaymentMethod } from '../../../common/enum';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  readonly subtotal: number;

  @IsNotEmpty()
  @IsNumber()
  readonly total: number;

  @IsNotEmpty()
  @IsInt()
  readonly quantity: number;

  @IsNotEmpty()
  readonly user: User;

  @IsEnum(PaymentMethod, {
    message: `Invalid method. Options are ${Object.values(PaymentMethod).join(
      ', ',
    )}`,
  })
  readonly paymentMethod: PaymentMethod;

  @IsNotEmpty()
  @ArrayNotEmpty({ message: `At least one product` })
  readonly boxes: BoxProducts[];
}
