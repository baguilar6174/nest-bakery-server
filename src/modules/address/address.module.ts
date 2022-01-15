import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Address } from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([Address])],
    controllers: [AddressController],
    providers: [AddressService],
})
export class AddressModule {}
