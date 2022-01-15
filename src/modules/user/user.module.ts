import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Schedule, User, Address, Rol, UserRol } from './entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Address, Schedule, Rol, UserRol]),
    ],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
