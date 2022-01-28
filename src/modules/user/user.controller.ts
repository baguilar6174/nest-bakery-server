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
    UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from './decorators/rol.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
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
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id') // localhost:3000/users/1
    findOne(@Param('id') id: number): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() body: CreateUserDto): Promise<User> {
        return this.usersService.create(body);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() body: UpdateUserDto,
    ): Promise<User> {
        return this.usersService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
        return this.usersService.delete(id);
    }
}
