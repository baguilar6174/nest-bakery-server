import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AddressModule } from './modules/address/address.module';
import { SettingsModule } from './modules/settings/settings.module';
import { AuthModule } from './modules/auth/auth.module';
import { BoxProductsModule } from './modules/box-products/box-products.module';
import { CategoryModule } from './modules/category/category.module';
import { TestModule } from './modules/test/test.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    AddressModule,
    SettingsModule,
    AuthModule,
    BoxProductsModule,
    CategoryModule,
    TestModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number;
  static apiPrefix: string;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = Number(this.configService.get('PORT'));
    AppModule.apiPrefix = this.configService.get('API_PREFIX');
  }
}
