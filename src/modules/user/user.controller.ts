/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from './decorators/rol.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { PaginationQueryDto } from './dtos/pagination-query.dto';
import { ReadUserDto } from './dtos/read-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities';
import { RoleGuard } from './guards/role.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  findAll(@Query() pagination: PaginationQueryDto): Promise<any> {
    return this.usersService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ReadUserDto> {
    return this.usersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateUserDto): Promise<ReadUserDto> {
    const user = await this.usersService.create(body);
    return plainToInstance(ReadUserDto, user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<any> {
    return this.usersService.delete(id);
  }
}
