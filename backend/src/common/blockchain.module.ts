import { Module } from '@nestjs/common';
import { EthersService } from "./ethers.service";
import { IpfsService } from "./ipfs.service";

@Module({
    imports: [],
    providers: [EthersService, IpfsService],
    exports: [],
  })
  export class BlockchainModule {}