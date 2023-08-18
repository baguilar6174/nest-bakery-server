import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    const categories: Category[] = await this.categoryRepository.find({
      where: {
        isActive: true,
      },
    });
    return categories;
  }

  async findOne(id: number): Promise<Category> {
    const category: Category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with id '${id}' not found`);
    }
    return category;
  }

  async create({ name, description }: CreateCategoryDto): Promise<Category> {
    const category: Category = this.categoryRepository.create({
      name,
      description,
    });
    return this.categoryRepository.save(category).catch((e) => {
      if (/(name)[\s\S]+(already exists)/.test(e.detail)) {
        throw new BadRequestException(
          `Category with name '${name}' already exists.`,
        );
      }
      return e;
    });
  }

  async update(id: number, { name, description }: Partial<CreateCategoryDto>) {
    let category: Category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with id '${id}' not found`);
    }
    category = await this.categoryRepository.save({
      id,
      name,
      description,
    });
    return {
      updated: true,
      message: `The category with id '${id}' has been modified`,
    };
  }

  async delete(id: number) {
    const category: Category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with id '${id}' not found`);
    }
    await this.categoryRepository.remove(category);
    return {
      deleted: true,
      message: `The '${category.name}' category has been deleted`,
    };
  }
}
