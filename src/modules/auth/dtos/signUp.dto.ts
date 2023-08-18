import {
  ArrayNotEmpty,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Address } from 'src/modules/address/address.entity';
import { Role } from '../../../common/constants';
import { PasswordMatch } from '../decorators';

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
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).*$/, {
    message: 'Password too weak',
  })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @PasswordMatch('password')
  readonly passwordConfirm: string;

  @IsOptional()
  @ArrayNotEmpty({ message: `At least one address` })
  readonly addresses: Address[];

  @IsEnum(Role, {
    message: `Invalid role. Options are ${Object.values(Role).join(', ')}`,
  })
  readonly role: Role = Role.USER;
}
