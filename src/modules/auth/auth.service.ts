import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { ReadUserDto } from '../user/dtos/read-user.dto';
import { Role, User } from '../user/entities';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user: User = await this.userService.findByEmail(email);
        const isValidPassword = await this.userService.checkPassword(
            password,
            user.password,
        );
        if (user && isValidPassword) return user;
        return null;
    }

    async signIn(user: User): Promise<any> {
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            roles: user.roles.map((r: Role): string => r.name),
        };
        return {
            user: plainToInstance(ReadUserDto, user),
            access_token: this.jwtService.sign(payload),
        };
    }

    async signUp(userDto: CreateUserDto): Promise<any> {
        const user: User = await this.userService.create(userDto);
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            roles: user.roles.map((r: Role): string => r.name),
        };
        return {
            user: plainToInstance(ReadUserDto, user),
            access_token: this.jwtService.sign(payload),
        };
    }

    async adminSignUp(userDto: CreateUserDto): Promise<any> {
        const user: User = await this.userService.createAdmin(userDto);
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            roles: user.roles.map((r: Role): string => r.name),
        };
        return {
            user: plainToInstance(ReadUserDto, user),
            access_token: this.jwtService.sign(payload),
        };
    }
}
