/* eslint-disable prettier/prettier */
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ReadCategoryDto {
    
    @Expose()
    readonly id: number;

    @Expose()
    readonly name: string;
    
    @Expose()
    readonly description: string;
}