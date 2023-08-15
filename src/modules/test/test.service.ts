import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  test(): any {
    return {
      message: 'Server online',
      date: new Date(),
    };
  }
}
