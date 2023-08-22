import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from './decorators/rol.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { UserService } from './user.service';
import { PaginationQueryDto } from '../../common/dtos';
import { IUser } from './interfaces/user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  findAll(
    @Query() pagination: PaginationQueryDto,
  ): Promise<{ total: number; data: IUser[] }> {
    return this.usersService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IUser> {
    return this.usersService.findOne(id);
  }
}
