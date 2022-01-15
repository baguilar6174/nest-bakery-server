import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
    static port: number;
    constructor(private readonly configService: ConfigService) {
        AppModule.port = +this.configService.get('PORT');
    }
}
