import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AddressModule } from './modules/address/address.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { SettingsModule } from './modules/settings/settings.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        UserModule,
        AddressModule,
        ScheduleModule,
        SettingsModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
    static port: number;
    static apiPrefix: string;
    constructor(private readonly configService: ConfigService) {
        AppModule.port = +this.configService.get('PORT');
        AppModule.apiPrefix = this.configService.get('API_PREFIX');
    }
}
