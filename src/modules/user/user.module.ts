import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, Rol, UserRol } from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([User, Rol, UserRol])],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
