import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  // Cantidad de elementos a obtener de la BD
  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit: number;

  // Cuantos elementos saltar
  @IsNumber()
  @IsOptional()
  offset: number;
}
