import { Global, Module } from '@nestjs/common';
import { EthersService } from "./ethers/ethers.service";
import { IpfsService } from "./ipfs.service";
import { SolanaService } from './solana/solana.service';

@Global()
@Module({
  providers: [EthersService, IpfsService, SolanaService],
  exports: [EthersService, IpfsService],
})
export class BlockchainModule { }