import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EthersService } from '../common/ethers.service';
import { IpfsService } from '../common/ipfs.service';

@Module({
  controllers: [UserController],
  providers: [UserService, EthersService, IpfsService],
})
export class UserModule {}
