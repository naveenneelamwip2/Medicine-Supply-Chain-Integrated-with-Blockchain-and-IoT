import { Injectable } from '@nestjs/common';
import { EthersService } from '../common/ethers.service';
import { IpfsService } from '../common/ipfs.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly ethersService: EthersService,
    private readonly ipfsService: IpfsService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const cid = await this.ipfsService.encryptAndStore(userData);

    let tx = await this.ethersService.addUser(userData.emailId, cid);

    return { message: 'User registered successfully', tx: tx, cid: cid };
  }

  async login(loginData) {
    const cid = await this.ethersService.getUserCid(loginData.emailId);

    const user = await this.ipfsService.retrieveAndDecrypt(cid) as any;

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (isPasswordValid) {
      const payload = { email: user.emailId, sub: user.name };
      const token = this.jwtService.sign(payload, { secret: "secretKey" });
      return { status: 201, message: "User Authenticated Successfully", data:{ access_token: token }};
    }
    return { status: 401, message: "Incorrect user id or password", data: loginData}
  }

  async getUserByEmail(email: string) {
    const cid = await this.ethersService.getUserCid(email);
    const userDoc = await this.ipfsService.retrieveAndDecrypt(cid);
    return userDoc
  }

  async updateUserByEmail(email: string, updateData) {
    const user = await this.getUserByEmail(email);
    Object.assign(user, updateData);
    const cid = await this.ipfsService.encryptAndStore(user);
    await this.ethersService.updateUser(email, cid);
    return { message: 'User updated successfully' };
  }
}
