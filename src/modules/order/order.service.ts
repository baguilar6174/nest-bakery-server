import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, PaginationQueryDto } from './dtos';
import { Order } from './entities';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll({ limit, offset }: PaginationQueryDto) {
    const [result, total] = await this.orderRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { total, result };
  }

  async findOne(id: string): Promise<Order> {
    const order: Order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id '${id}' not found`);
    }
    return order;
  }

  async create(body: CreateOrderDto): Promise<Order> {
    const order: Order = this.orderRepository.create({
      ...body,
    });
    return this.orderRepository.save(order);
  }

  async update(id: string) {
    let order: Order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id '${id}' not found`);
    }
    order = await this.orderRepository.save({ ...order, id });
    return {
      updated: true,
      message: `The '${order.id}' order has been modified to delivered`,
    };
  }

  async delete(id: string) {
    const order: Order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id '${id}' not found`);
    }
    await this.orderRepository.remove(order);
    return {
      deleted: true,
      message: `The '${id}' order has been deleted`,
    };
  }
}
