import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/category.entity';
import { BoxProductsController } from './box-products.controller';
import { BoxProductsService } from './box-products.service';
import { BoxProducts, BoxProductsImage } from './entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([BoxProducts, Category, BoxProductsImage]),
    ],
    controllers: [BoxProductsController],
    providers: [BoxProductsService],
})
export class BoxProductsModule {}
