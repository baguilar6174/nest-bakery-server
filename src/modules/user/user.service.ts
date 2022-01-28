import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, Role } from './entities';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        private configService: ConfigService,
    ) {}

    async checkPassword(
        password: string,
        passwordDB: string,
    ): Promise<boolean> {
        return await bcrypt.compare(password, passwordDB);
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        const user: User = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException(`Resources not found`);
        }
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException(`User (email=${email}) not found`);
        }
        return user;
    }

    async create(body: CreateUserDto): Promise<User> {
        // Validate email availability
        const count = await this.userRepository.findOne({
            where: { email: body.email },
        });

        if (count) {
            throw new BadRequestException(
                `user (email=${body.email}) already exist`,
            );
        }

        const hash = await this.hashPassword(body.password);
        const user: User = this.userRepository.create({
            ...body,
            password: hash,
        });
        const adminRol = Number(this.configService.get<string>('USER_ROLE'));
        const role: Role = await this.roleRepository.findOne(adminRol);
        user.roles = [role];
        return this.userRepository.save(user);
    }

    async createAdmin(body: CreateUserDto): Promise<User> {
        // Validate email availability
        const count = await this.userRepository.findOne({
            where: { email: body.email },
        });

        if (count) {
            throw new BadRequestException(
                `user (email=${body.email}) already exist`,
            );
        }
        const hash = await this.hashPassword(body.password);
        const user: User = this.userRepository.create({
            ...body,
            password: hash,
        });
        const adminRol = Number(this.configService.get<string>('ADMIN_ROLE'));
        const role: Role = await this.roleRepository.findOne(adminRol);
        user.roles = [role];
        return this.userRepository.save(user);
    }

    async update(
        id: number,
        { name, email, phone, password }: UpdateUserDto,
    ): Promise<User> {
        const hash = await this.hashPassword(password);
        const user: User = await this.userRepository.save({
            id,
            name,
            email,
            phone,
            password: hash,
        });
        if (!user) {
            throw new NotFoundException(`Resource not found`);
        }
        return user;
    }

    async delete(id: number): Promise<void> {
        const user: User = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException(`Resources not found`);
        }
        this.userRepository.remove(user);
    }
}
