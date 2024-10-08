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


  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updateUserByEmail(@Body() updateData) {
    return this.userService.updateUserByEmail(updateData);
  }
}
