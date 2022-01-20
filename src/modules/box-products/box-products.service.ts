import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/category.entity';
import { BoxProducts } from './box-products.entity';
import { CreateBoxDto } from './dtos/create-box.dto';

@Injectable()
export class BoxProductsService {
    constructor(
        @InjectRepository(BoxProducts)
        private readonly boxRepository: Repository<BoxProducts>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async findAll(): Promise<BoxProducts[]> {
        return await this.boxRepository.find();
    }

    async findOne(id: number): Promise<BoxProducts> {
        const box: BoxProducts = await this.boxRepository.findOne(id);
        if (!box) {
            throw new NotFoundException(`Box products not found`);
        }
        return box;
    }

    async create({
        name,
        description,
        price,
        quantity,
    }: CreateBoxDto): Promise<BoxProducts> {
        const box: BoxProducts = this.boxRepository.create({
            name,
            description,
            price,
            quantity,
        });
        const category: Category = await this.categoryRepository.findOne({
            where: { name: 'General' },
        });
        box.categories = [category];
        return this.boxRepository.save(box);
    }

    async update(
        id: number,
        { name, description, price, quantity }: CreateBoxDto,
    ): Promise<BoxProducts> {
        const box: BoxProducts = await this.boxRepository.save({
            id,
            name,
            description,
            price,
            quantity,
        });
        if (!box) {
            throw new NotFoundException(`Resource not found`);
        }
        return box;
    }

    async delete(id: number): Promise<void> {
        const box: BoxProducts = await this.boxRepository.findOne(id);
        if (!box) {
            throw new NotFoundException(`Resources not found`);
        }
        this.boxRepository.remove(box);
    }
}
