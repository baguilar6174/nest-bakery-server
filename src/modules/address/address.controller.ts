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
import { RoleGuard } from '../user/guards/role.guard';
import { Address } from './address.entity';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/create-address.dto';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':id')
  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  findbyUser(@Param('id') id: number): Promise<Address[]> {
    return this.addressService.findbyUser(id);
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
  update(
    @Param('id') userId: number,
    @Body() body: CreateAddressDto,
  ): Promise<any> {
    return this.addressService.update(userId, body);
  }

  @Delete(':id')
  @Roles('admin', 'user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  delete(@Param('id') id: number): Promise<any> {
    return this.addressService.delete(id);
  }
}
