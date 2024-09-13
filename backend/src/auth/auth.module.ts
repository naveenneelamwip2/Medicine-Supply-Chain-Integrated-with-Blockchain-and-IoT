import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { UserService } from 'src/user/user.service';
import { EthersService } from 'src/common/ethers.service';
import { BlockchainModule } from 'src/common/blockchain.module';
import { IpfsService } from 'src/common/ipfs.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60m' },
    }),
    UserModule,
    BlockchainModule,
  ],
  providers: [UserService, EthersService, IpfsService, AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
