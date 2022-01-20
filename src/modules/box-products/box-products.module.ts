import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/category.entity';
import { BoxProductsController } from './box-products.controller';
import { BoxProducts } from './box-products.entity';
import { BoxProductsService } from './box-products.service';

@Module({
    imports: [TypeOrmModule.forFeature([BoxProducts, Category])],
    controllers: [BoxProductsController],
    providers: [BoxProductsService],
})
export class BoxProductsModule {}
