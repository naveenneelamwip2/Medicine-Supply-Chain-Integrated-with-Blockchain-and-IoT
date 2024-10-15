import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() loginData) {
    return this.authService.login(loginData);
  }
  
  @Post('generate-token')
  async generateToken(@Body() loginData) {
    return this.authService.verifyRefreshToken(loginData);
  }
}
