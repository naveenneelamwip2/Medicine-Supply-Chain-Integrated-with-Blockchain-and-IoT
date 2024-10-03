import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userData) {
    return this.userService.register(userData);
  }

  @Post('login')
  async login(@Body() loginData) {
    return this.userService.login(loginData);
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updateUserByEmail(@Param('email') email: string, @Body() updateData) {
    return this.userService.updateUserByEmail(email, updateData);
  }
}
