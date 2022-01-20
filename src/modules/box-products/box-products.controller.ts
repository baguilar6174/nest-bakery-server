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
} from '@nestjs/common';

import { BoxProducts } from './box-products.entity';
import { BoxProductsService } from './box-products.service';
import { CreateBoxDto } from './dtos/create-box.dto';

@Controller('box-products')
export class BoxProductsController {
    constructor(private readonly boxService: BoxProductsService) {}

    // 'localhost:3000/box-products'
    @Get()
    findAll(): Promise<BoxProducts[]> {
        return this.boxService.findAll();
    }

    @Get(':id') // localhost:3000/users/1
    findOne(@Param('id') id: number): Promise<BoxProducts> {
        return this.boxService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() body: CreateBoxDto): Promise<BoxProducts> {
        return this.boxService.create(body);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() body: CreateBoxDto,
    ): Promise<BoxProducts> {
        return this.boxService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
        return this.boxService.delete(id);
    }
}
