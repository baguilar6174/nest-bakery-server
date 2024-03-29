import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  readonly description: string;
}
