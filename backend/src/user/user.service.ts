import { Injectable } from '@nestjs/common';
import { EthersService } from '../common/ethers.service';
import { IpfsService } from '../common/ipfs.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    private readonly ethersService: EthersService,
    private readonly ipfsService: IpfsService,
  ) {}

  async register(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const cid = await this.ipfsService.encryptAndStore(userData);

    let tx = await this.ethersService.addUser(userData.emailId, cid);

    return { message: 'User registered successfully', tx: tx, cid: cid };
  }

  async login(loginData) {
    const cid = await this.ethersService.getUserHash(loginData.emailId);

    const user = await this.ipfsService.retrieveAndDecrypt(cid) as any;

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (isPasswordValid) {
      // Generate JWT token
      return { token: 'JWT_TOKEN' };
    }
    throw new Error('Invalid credentials');
  }

  async getUserByEmail(email: string) {
    const cid = await this.ethersService.getUserHash(email);
    const encryptedUserJson = await this.ipfsService.retrieveJson(cid);
    return this.ipfsService.decryptJson(encryptedUserJson);
  }

  async updateUserByEmail(email: string, updateData) {
    const user = await this.getUserByEmail(email);
    Object.assign(user, updateData);
    const encryptedUserJson = await this.ipfsService.encryptAndStore(user);
    const cid = await this.ipfsService.storeJson(encryptedUserJson);
    await this.ethersService.updateUser(email, cid);
    return { message: 'User updated successfully' };
  }
}
