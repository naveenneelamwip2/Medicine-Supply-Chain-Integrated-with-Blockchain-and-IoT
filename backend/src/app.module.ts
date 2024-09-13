import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MedicineModule } from './medicine/medicine.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    MedicineModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
