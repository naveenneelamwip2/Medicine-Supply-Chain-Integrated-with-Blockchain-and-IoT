import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { EthersService } from '../common/ethers/ethers.service';
import { IpfsService } from '../common/ipfs.service';

describe('UserService', () => {
  let service: UserService;
  let ethersService: EthersService;
  let ipfsService: IpfsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: EthersService,
          useValue: {
            addUser: jest.fn(),
            getUserHash: jest.fn(),
            updateUser: jest.fn(),
          },
        },
        {
          provide: IpfsService,
          useValue: {
            encryptAndStore: jest.fn(),
            storeJson: jest.fn(),
            retrieveJson: jest.fn(),
            decryptJson: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    ethersService = module.get<EthersService>(EthersService);
    ipfsService = module.get<IpfsService>(IpfsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user', async () => {
    const userData = { emailId: 'test@example.com', password: 'password' };
    jest.spyOn(ipfsService, 'encryptAndStore').mockResolvedValue('encryptedData');
    jest.spyOn(ipfsService, 'storeJson').mockResolvedValue('cid');
    jest.spyOn(ethersService, 'addUser').mockResolvedValue(undefined);

    const result = await service.register(userData);
    expect(result).toEqual({ message: 'User registered successfully' });
  });

  it('should login a user', async () => {
    const loginData = { emailId: 'test@example.com', password: 'password' };
    jest.spyOn(ethersService, 'getUserHash').mockResolvedValue('cid');
    jest.spyOn(ipfsService, 'retrieveJson').mockResolvedValue('encryptedData');
    jest.spyOn(ipfsService, 'decryptJson').mockResolvedValue({ password: 'password' });

    const result = await service.login(loginData);
    expect(result).toEqual({ token: 'JWT_TOKEN' });
  });

  it('should get user by email', async () => {
    const email = 'test@example.com';
    jest.spyOn(ethersService, 'getUserHash').mockResolvedValue('cid');
    jest.spyOn(ipfsService, 'retrieveJson').mockResolvedValue('encryptedData');
    jest.spyOn(ipfsService, 'decryptJson').mockResolvedValue({ emailId: email });

    const result = await service.getUserByEmail(email);
    expect(result).toEqual({ emailId: email });
  });

  it('should update user by email', async () => {
    const email = 'test@example.com';
    const updateData = { name: 'Updated Name' };
    jest.spyOn(service, 'getUserByEmail').mockResolvedValue({ emailId: email, ...updateData });
    jest.spyOn(ipfsService, 'encryptAndStore').mockResolvedValue('encryptedData');
    jest.spyOn(ipfsService, 'storeJson').mockResolvedValue('cid');
    jest.spyOn(ethersService, 'updateUser').mockResolvedValue(undefined);

    const result = await service.updateUserByEmail(email, updateData);
    expect(result).toEqual({ message: 'User updated successfully' });
  });
});
