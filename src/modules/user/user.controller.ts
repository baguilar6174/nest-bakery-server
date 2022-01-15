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
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    // 'localhost:3000/users'
    @Get()
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
