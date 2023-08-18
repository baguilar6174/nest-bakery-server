import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from './decorators/rol.decorator';
import { ReadUserDto } from './dtos/read-user.dto';
import { RoleGuard } from './guards/role.guard';
import { UserService } from './user.service';
import { PaginationQueryDto } from '../../common/dtos';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  findAll(@Query() pagination: PaginationQueryDto) {
    return this.usersService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ReadUserDto> {
    return this.usersService.findOne(id);
  }
}
