import { ArrayNotEmpty, IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { BoxProducts } from 'src/modules/box-products/entities';
import { User } from 'src/modules/user/entities';
import { PaymentMethod } from '../entities';

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

    @IsNotEmpty()
    readonly paymentMethod: PaymentMethod;

    @IsNotEmpty()
    @ArrayNotEmpty({ message: `At least one product` })
    readonly boxes: BoxProducts[];
}
