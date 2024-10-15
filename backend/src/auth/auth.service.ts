import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async login(loginData) {
    const user = await this.userService.login(loginData);
    if(!user) return { status: 401, message: "Incorrect user id or password", data: loginData }

    const payload = { emailId: user.emailId, sub: user.name };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: "refreshSecretKey",
      expiresIn: '30m'
    });
    return { status: 201, message: "User Authenticated Successfully", data: { accessToken, refreshToken } };
  }

  async verifyRefreshToken(loginData: any) {
    const { refreshToken } = loginData;

    if (!refreshToken) return { status: 401, message: "Unauthorized" };

    let accessToken;
    try {
      const user = this.jwtService.verify(refreshToken, { secret: 'refreshSecretKey' });
      const payload = { emailId: user.emailId };
      accessToken = this.jwtService.sign(payload);

    } catch (err) {
      return { stutus: 403, message: err.message };
    }

    return {status: 200, message: "new token generated", accessToken}
  }
}
