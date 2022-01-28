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

import { BoxProducts } from './box-products.entity';
import { BoxProductsService } from './box-products.service';
import { CreateBoxDto } from './dtos/create-box.dto';
import { ReadBoxProductDto } from './dtos/read-box.dto';

@Controller('box-products')
export class BoxProductsController {
    constructor(private readonly boxService: BoxProductsService) {}

    // 'localhost:3000/box-products'
    @Get()
    findAll(): Promise<ReadBoxProductDto[]> {
        return this.boxService.findAll();
    }

    @Get(':id') // localhost:3000/box-products/1
    findOne(@Param('id') id: number): Promise<BoxProducts> {
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
    update(
        @Param('id') id: number,
        @Body() body: CreateBoxDto,
    ): Promise<BoxProducts> {
        return this.boxService.update(id, body);
    }

    @Delete(':id')
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    delete(@Param('id') id: number): Promise<void> {
        return this.boxService.delete(id);
    }
}
