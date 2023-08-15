import {
  ArrayNotEmpty,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { Category } from 'src/modules/category/category.entity';

export class CreateBoxDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  readonly description: string;

  @IsNotEmpty()
  @IsInt()
  readonly quantity: number;

  @IsNotEmpty()
  @ArrayNotEmpty({ message: `At least one category` })
  readonly categories: Category[];

  @IsNotEmpty()
  @ArrayNotEmpty({ message: `At least one image` })
  readonly images: any[];
}
