import { Module } from '@nestjs/common';
import { MedicineController } from './medicine.controller';
import { MedicineService } from './medicine.service';
import { EthersService } from '../common/ethers.service';
import { IpfsService } from '../common/ipfs.service';

@Module({
  controllers: [MedicineController],
  providers: [MedicineService, EthersService, IpfsService],
})
export class MedicineModule {}
