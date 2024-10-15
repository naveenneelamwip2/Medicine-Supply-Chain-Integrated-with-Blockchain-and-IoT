import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';;
import { JwtService } from '@nestjs/jwt';
import { BlockchainModule } from 'src/common/blockchain.module';

@Module({
  imports: [BlockchainModule],
  controllers: [UserController],
  providers: [JwtService, UserService],
  exports: [UserService]
})
export class UserModule {}
