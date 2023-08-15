import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { User } from 'src/modules/user/entities';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  readonly addreess: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(250)
  readonly details: string;

  @IsNotEmpty()
  readonly user: User;
}
