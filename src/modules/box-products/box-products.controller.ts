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
import { BoxProductsService } from './box-products.service';
import { CreateBoxDto, ReadBoxProductDto } from './dtos';
import { BoxProducts } from './entities';
import { PaginationQueryDto } from '../../common/dtos';

@Controller('box-products')
export class BoxProductsController {
  constructor(private readonly boxService: BoxProductsService) {}

  // 'localhost:3000/box-products'
  @Get()
  findAll(@Query() pagination: PaginationQueryDto) {
    return this.boxService.findAll(pagination);
  }

  @Get(':id') // localhost:3000/box-products/1
  findOne(@Param('id') id: string): Promise<ReadBoxProductDto> {
    return this.boxService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  create(@Body() body: CreateBoxDto): Promise<BoxProducts> {
    return this.boxService.create(body);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(@Param('id') id: string, @Body() body: CreateBoxDto) {
    return this.boxService.update(id, body);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  delete(@Param('id') id: string) {
    return this.boxService.delete(id);
  }
}
