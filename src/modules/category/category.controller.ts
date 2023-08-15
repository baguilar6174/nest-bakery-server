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
import { RoleGuard } from '../user/guards/role.guard';
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
  findOne(@Param('id') id: number): Promise<Category> {
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
  update(
    @Param('id') id: number,
    @Body() body: Partial<CreateCategoryDto>,
  ): Promise<any> {
    return this.categoryService.update(id, body);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  delete(@Param('id') id: number): Promise<any> {
    return this.categoryService.delete(id);
  }
}
