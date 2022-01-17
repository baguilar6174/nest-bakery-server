import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsDto } from './dtos/settings.dto';
import { Settings } from './settings.entity';

@Injectable()
export class SettingsService {
    constructor(
        @InjectRepository(Settings)
        private readonly settingsRepository: Repository<Settings>,
    ) {}

    async findAll(): Promise<Settings[]> {
        return await this.settingsRepository.find();
    }

    async findOne(id: number): Promise<Settings> {
        const settings: Settings = await this.settingsRepository.findOne(id);
        if (!settings) {
            throw new NotFoundException(`Resources not found`);
        }
        return settings;
    }

    async create(body: SettingsDto): Promise<Settings> {
        const settings: Settings = this.settingsRepository.create(body);
        return this.settingsRepository.save(settings);
    }

    async update(
        id: number,
        { config, idUser }: SettingsDto,
    ): Promise<Settings> {
        const settings: Settings = await this.settingsRepository.save({
            id,
            config,
            idUser,
        });
        if (!settings) {
            throw new NotFoundException(`Resource not found`);
        }
        return settings;
    }

    async delete(id: number): Promise<void> {
        const settings: Settings = await this.settingsRepository.findOne(id);
        if (!settings) {
            throw new NotFoundException(`Resources not found`);
        }
        this.settingsRepository.remove(settings);
    }
}
