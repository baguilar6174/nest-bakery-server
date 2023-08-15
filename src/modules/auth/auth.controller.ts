import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Request() req) {
    return await this.authService.signIn(req.user);
  }

  @Post('admin/signup')
  async adminSignUp(@Body() body: CreateUserDto) {
    return await this.authService.adminSignUp(body);
  }

  @Post('signup')
  async signUp(@Body() body: CreateUserDto) {
    return await this.authService.signUp(body);
  }
}
