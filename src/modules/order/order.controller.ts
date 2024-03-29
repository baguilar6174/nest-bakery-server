import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../user/decorators/rol.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { CreateOrderDto } from './dtos';
import { Order } from './entities';
import { OrderService } from './order.service';
import { PaginationQueryDto } from '../../common/dtos';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  findAll(@Query() pagination: PaginationQueryDto) {
    return this.orderService.findAll(pagination);
  }

  @Get(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  findOne(@Param('id') id: string): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  create(@Body() body: CreateOrderDto): Promise<Order> {
    return this.orderService.create(body);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(@Param('id') id: string) {
    return this.orderService.update(id);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  delete(@Param('id') id: string) {
    return this.orderService.delete(id);
  }
}
