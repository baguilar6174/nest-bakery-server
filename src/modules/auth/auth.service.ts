import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dtos/create-user.dto';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        const isValidPassword = await this.userService.checkPassword(
            password,
            user.password,
        );
        if (user && isValidPassword) return user;
        return null;
    }

    async signIn(user: any) {
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        };
        // return { ...user, access_token: this.jwtService.sign(payload) };
        return { ...payload, access_token: this.jwtService.sign(payload) };
    }

    async signUp(userDto: CreateUserDto) {
        return this.userService.create(userDto);
    }
}
