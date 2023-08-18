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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../user/decorators/rol.decorator';
import { RoleGuard } from '../auth/guards/role.guard';
import { Address } from './address.entity';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/create-address.dto';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':id')
  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findbyUser(@Param('id') _id: number): Address[] {
    // return this.addressService.findbyUser(id);
    return [];
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  create(@Body() body: CreateAddressDto): Promise<Address> {
    return this.addressService.create(body);
  }

  @Put(':id')
  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(@Param('id') id: string, @Body() body: CreateAddressDto) {
    return this.addressService.update(id, body);
  }

  @Delete(':id')
  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  delete(@Param('id') id: string) {
    return this.addressService.delete(id);
  }
}
