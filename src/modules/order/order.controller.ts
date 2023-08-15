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
import { RoleGuard } from '../user/guards/role.guard';
import { CreateOrderDto, PaginationQueryDto } from './dtos';
import { Order } from './entities';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  findAll(@Query() pagination: PaginationQueryDto): Promise<any> {
    return this.orderService.findAll(pagination);
  }

  @Get(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  findOne(@Param('id') id: number): Promise<Order> {
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
  update(@Param('id') id: number): Promise<any> {
    return this.orderService.update(id);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  delete(@Param('id') id: number): Promise<any> {
    return this.orderService.delete(id);
  }
}
