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
import { PaginationQueryDto } from './dtos/pagination-query.dto';
import { ReadUserDto } from './dtos/read-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private configService: ConfigService,
  ) {}

  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async findAll({ limit, offset }: PaginationQueryDto): Promise<any> {
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

  async findOne(id: number): Promise<ReadUserDto> {
    const user: User = await this.userRepository.findOne(id);
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
    const adminRol = Number(this.configService.get<string>('USER_ROLE'));
    const role: Role = await this.roleRepository.findOne(adminRol);
    user.roles = [role];
    return this.userRepository.save(user).catch((e) => {
      if (/(email)[\s\S]+(already exists)/.test(e.detail)) {
        throw new BadRequestException(
          `Una cuenta con el çemail '${body.email}' ya existe!`,
        );
      }
      return e;
    });
  }

  async createAdmin(body: CreateUserDto): Promise<User> {
    const hash = await this.hashPassword(body.password);
    const user: User = this.userRepository.create({
      ...body,
      password: hash,
    });
    const adminRol = Number(this.configService.get<string>('ADMIN_ROLE'));
    const role: Role = await this.roleRepository.findOne(adminRol);
    user.roles = [role];
    return this.userRepository.save(user).catch((e) => {
      if (/(email)[\s\S]+(already exists)/.test(e.detail)) {
        throw new BadRequestException(
          `Una cuenta con el çemail '${body.email}' ya existe!`,
        );
      }
      return e;
    });
  }

  async update(id: number, body: UpdateUserDto): Promise<any> {
    const hash = await this.hashPassword(body.password);
    let user: User = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuario con id '${id}' no encontrado`);
    }
    user = await this.userRepository.save({ ...body, id, password: hash });
    return {
      updated: true,
      message: `El usuario '${user.name}' ha sido modificado`,
    };
  }

  async delete(id: number): Promise<any> {
    const user: User = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuario con id '${id}' no encontrado`);
    }
    await this.userRepository.remove(user);
    return {
      deleted: true,
      message: `El usuario '${user.name}' ha sido eliminado`,
    };
  }
}
