import {
  ArrayNotEmpty,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Address } from 'src/modules/address/address.entity';
import { Role } from '../../../common/enum/roles.enum';

export class CreateUserDto {
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

  @IsOptional()
  @ArrayNotEmpty({ message: `At least one address` })
  readonly addresses: Address[];

  @IsEnum(Role, {
    message: `Invalid role. Options are ${Object.values(Role).join(', ')}`,
  })
  readonly role: Role = Role.USER;
}
