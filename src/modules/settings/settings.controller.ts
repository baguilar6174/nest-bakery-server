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

import { SettingsDto } from './dtos/settings.dto';
import { Settings } from './entities';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Get()
    findAll(): Promise<Settings[]> {
        return this.settingsService.findAll();
    }

    @Get(':id') // localhost:3000/users/1
    findOne(@Param('id') id: number): Promise<Settings> {
        return this.settingsService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() body: SettingsDto): Promise<Settings> {
        return this.settingsService.create(body);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() body: SettingsDto,
    ): Promise<Settings> {
        return this.settingsService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
        return this.settingsService.delete(id);
    }
}
