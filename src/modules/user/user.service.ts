import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from '../auth/dtos/signUp.dto';
import { User } from './entities';
import { PaginationQueryDto } from './dtos/pagination-query.dto';
import { ReadUserDto } from './dtos/read-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async findAll({ limit, offset }: PaginationQueryDto) {
    const [result, total] = await this.userRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    const data = result.map(
      (u: User): ReadUserDto => plainToInstance(ReadUserDto, u),
    );
    return { total, data };
  }

  async findOne(id: string): Promise<ReadUserDto> {
    const user: User = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario no encontrado`);
    }
    return plainToInstance(ReadUserDto, user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(
        `Usuario con (email=${email}) no encontrado!`,
      );
    }
    return user;
  }

  async create(body: CreateUserDto): Promise<User> {
    const hash = await this.hashPassword(body.password);
    const user: User = this.userRepository.create({
      ...body,
      password: hash,
    });
    await this.userRepository.save(user);
    return user;

    // ! Catch error
    /* return this.userRepository.save(user).catch((e) => {
      if (/(email)[\s\S]+(already exists)/.test(e.detail)) {
        throw new BadRequestException(
          `Una cuenta con el email '${body.email}' ya existe!`,
        );
      }
      return e;
    }); */
  }
}
