import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoxProducts } from '../box-products/entities';

import { User } from '../user/entities';
import { Discount, Iva, Order, OrderState, PaymentMethod } from './entities';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderState,
      Order,
      PaymentMethod,
      Discount,
      Iva,
      User,
      BoxProducts,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
