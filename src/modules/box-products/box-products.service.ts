import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateBoxDto } from './dtos/create-box.dto';
import { ReadBoxProductDto } from './dtos/read-box.dto';
import { BoxProducts } from './entities';
import { PaginationQueryDto } from '../../common/dtos';

@Injectable()
export class BoxProductsService {
  constructor(
    @InjectRepository(BoxProducts)
    private readonly boxRepository: Repository<BoxProducts>,
  ) {}

  async findAll({ limit, offset }: PaginationQueryDto) {
    const [result, total] = await this.boxRepository.findAndCount({
      skip: offset,
      take: limit,
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
    const data = result.map(
      (b: BoxProducts): ReadBoxProductDto =>
        plainToInstance(ReadBoxProductDto, b),
    );
    return { total, data };
  }

  async findOne(id: string): Promise<ReadBoxProductDto> {
    const box: BoxProducts = await this.boxRepository.findOne({
      where: { id },
    });
    if (!box) {
      throw new NotFoundException(`Box products not found`);
    }
    return plainToInstance(ReadBoxProductDto, box);
  }

  async create(body: CreateBoxDto): Promise<BoxProducts> {
    const box: BoxProducts = this.boxRepository.create(body);
    return this.boxRepository.save(box);
  }

  async update(id: string, body: CreateBoxDto) {
    let box: BoxProducts = await this.boxRepository.findOne({ where: { id } });
    if (!box) {
      throw new NotFoundException(`Box with id '${id}' not found`);
    }
    box = await this.boxRepository.save({ ...body, id });
    return {
      updated: true,
      message: `The '${box.name}' box has been modified`,
    };
  }

  async delete(id: string) {
    const box: BoxProducts = await this.boxRepository.findOne({
      where: { id },
    });
    if (!box) {
      throw new NotFoundException(`Box with id '${id}' not found`);
    }
    await this.boxRepository.remove(box);
    return {
      deleted: true,
      message: `The '${box.name}' box has been deleted`,
    };
  }
}
