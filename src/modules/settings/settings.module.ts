import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Settings } from './settings.entity';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
    imports: [TypeOrmModule.forFeature([Settings])],
    controllers: [SettingsController],
    providers: [SettingsService],
})
export class SettingsModule {}
