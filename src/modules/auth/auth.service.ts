import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';

import { CreateUserDto } from './dtos/signUp.dto';
import { ReadUserDto } from '../user/dtos/read-user.dto';
import { User } from '../user/entities';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user: User = await this.userService.findByEmail(email);
    const isValidPassword = await this.userService.checkPassword(
      password,
      user.password,
    );
    if (user && isValidPassword) return user;
    return null;
  }

  async signIn(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return {
      user: plainToInstance(ReadUserDto, user),
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(userDto: CreateUserDto) {
    const user: User = await this.userService.create(userDto);
    const payload = {
      id: user.id,
      email: user.email,
    };
    return {
      user: plainToInstance(ReadUserDto, user),
      access_token: this.jwtService.sign(payload),
    };
  }
}
