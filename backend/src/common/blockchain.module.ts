import { Global, Module } from '@nestjs/common';
import { EthersService } from "./ethers.service";
import { IpfsService } from "./ipfs.service";

@Global()
@Module({
  providers: [EthersService, IpfsService],
  exports: [EthersService, IpfsService],
})
export class BlockchainModule { }