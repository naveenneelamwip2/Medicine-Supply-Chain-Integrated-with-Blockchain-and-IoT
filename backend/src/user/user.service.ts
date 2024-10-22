import { Inject, Injectable } from '@nestjs/common';
import { EthersService } from '../common/ethers/ethers.service';
import { IpfsService } from '../common/ipfs.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    private readonly ethersService: EthersService,
    @Inject(IpfsService) private readonly ipfsService: IpfsService
  ) { }

  async register(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const cid = await this.ipfsService.encryptAndStore(userData);

    let tx = await this.ethersService.addUser(userData.emailId, cid);

    return { message: 'User registered successfully', tx: tx, cid: cid };
  }

  async login(loginData): Promise<any> {
    const cid = await this.ethersService.getUserCid(loginData.emailId);

    const user = await this.ipfsService.retrieveAndDecrypt(cid) as any;

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);

    if(!isPasswordValid) return null

    return user
  }

  async getUserByEmail(email: string) {
    const cid = await this.ethersService.getUserCid(email);
    const userDoc = await this.ipfsService.retrieveAndDecrypt(cid);
    return userDoc
  }

  async updateUserByEmail(updateData) {
    const user = await this.getUserByEmail(updateData.emailId);
    if (!user) return { status: 401, message: 'User not found in blockchain', data: updateData.email };
    Object.assign(user, updateData);
    const cid = await this.ipfsService.encryptAndStore(user);
    const tx = await this.ethersService.updateUser(updateData.email, cid);
    return { status: 201, message: 'User updated successfully', data: { tx, cid: cid } };
  }
}
