import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { CreateAddressDto } from './dtos/create-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  /* async findbyUser(id: number): Promise<Address[]> {
    const addresses: Address[] = await this.addressRepository.find({
      where: { user: id },
      order: { createdAt: 'DESC' },
    });
    return addresses;
  } */

  async create(body: CreateAddressDto): Promise<Address> {
    const address: Address = this.addressRepository.create(body);
    return this.addressRepository.save(address);
  }

  async update(id: string, body: CreateAddressDto) {
    let address: Address = await this.addressRepository.findOne({
      where: { id },
    });
    if (!address) {
      throw new NotFoundException(`User addresses's with id '${id}' not found`);
    }
    address = await this.addressRepository.save({ ...body, id });
    return {
      updated: true,
      message: `The '${address.addreess}' address has been modified`,
    };
  }

  async delete(id: string) {
    const address: Address = await this.addressRepository.findOne({
      where: { id },
    });
    if (!address) {
      throw new NotFoundException(`Address with id '${id}' not found`);
    }
    await this.addressRepository.remove(address);
    return {
      deleted: true,
      message: `The '${address.addreess}' address has been deleted`,
    };
  }
}
