import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SettingsDto {
    @IsNotEmpty()
    @IsString()
    readonly config: string;

    @IsNotEmpty()
    @IsInt()
    readonly idUser: number;
}
