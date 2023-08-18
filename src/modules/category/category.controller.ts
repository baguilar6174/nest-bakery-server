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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../user/decorators/rol.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  create(@Body() body: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(body);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(@Param('id') id: string, @Body() body: Partial<CreateCategoryDto>) {
    return this.categoryService.update(id, body);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
