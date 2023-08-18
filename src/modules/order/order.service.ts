import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, PaginationQueryDto } from './dtos';
import { Discount, Iva, Order, OrderState } from './entities';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderState)
    private readonly stateRepository: Repository<OrderState>,
    @InjectRepository(Iva)
    private readonly ivaRepository: Repository<Iva>,
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
  ) {}

  async findAll({ limit, offset }: PaginationQueryDto) {
    const [result, total] = await this.orderRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { total, result };
  }

  async findOne(id: number): Promise<Order> {
    const order: Order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id '${id}' not found`);
    }
    return order;
  }

  async create(body: CreateOrderDto): Promise<Order> {
    // Set pending state
    const state: OrderState = await this.stateRepository.findOne({
      where: { id: 1 },
    });
    // Set iva 12
    const iva: Iva = await this.ivaRepository.findOne({ where: { id: 1 } });
    // Set discount 0
    const discount: Discount = await this.discountRepository.findOne({
      where: { id: 1 },
    });
    const order: Order = this.orderRepository.create({
      ...body,
      state,
      iva,
      discount,
    });
    return this.orderRepository.save(order);
  }

  async update(id: number) {
    let order: Order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with id '${id}' not found`);
    }
    // Set delivered state
    const state: OrderState = await this.stateRepository.findOne({
      where: { id: 2 },
    });
    order = await this.orderRepository.save({ ...order, state, id });
    return {
      updated: true,
      message: `The '${order.id}' order has been modified to delivered`,
    };
  }

  async delete(id: number) {
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
