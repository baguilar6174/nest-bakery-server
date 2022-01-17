import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoxProductsImageController } from './box-products-image.controller';
import { BoxProductsImage } from './box-products-image.entiy';
import { BoxProductsImageService } from './box-products-image.service';

@Module({
    imports: [TypeOrmModule.forFeature([BoxProductsImage])],
    controllers: [BoxProductsImageController],
    providers: [BoxProductsImageService],
})
export class BoxProductsImageModule {}
