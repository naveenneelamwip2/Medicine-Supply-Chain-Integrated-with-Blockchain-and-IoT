import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MedicineModule } from './medicine/medicine.module';
import { AuthModule } from './auth/auth.module';
import { BlockchainModule } from './common/blockchain.module';

@Module({
  imports: [
    UserModule,
    MedicineModule,
    AuthModule,
    BlockchainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
