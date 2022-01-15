import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    readonly phone: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(50)
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;
}
