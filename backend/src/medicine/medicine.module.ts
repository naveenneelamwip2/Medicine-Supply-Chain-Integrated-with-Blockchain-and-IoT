import { Module } from '@nestjs/common';
import { MedicineController } from './medicine.controller';
import { MedicineService } from './medicine.service';
import { BlockchainModule } from 'src/common/blockchain.module';

@Module({
  imports: [BlockchainModule],
  controllers: [MedicineController],
  providers: [MedicineService],
})
export class MedicineModule {}
