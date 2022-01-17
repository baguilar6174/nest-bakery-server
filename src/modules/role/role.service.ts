import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    async findOne(id: number): Promise<Role> {
        const role: Role = await this.roleRepository.findOne(id);
        if (!role) {
            throw new NotFoundException(`Resources not found`);
        }
        return role;
    }
}
