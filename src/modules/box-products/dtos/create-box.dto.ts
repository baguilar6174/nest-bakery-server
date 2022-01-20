import {
    IsDate,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
} from 'class-validator';

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
}
