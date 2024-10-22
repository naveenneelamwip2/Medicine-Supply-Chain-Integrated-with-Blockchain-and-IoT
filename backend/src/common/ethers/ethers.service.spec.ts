import { Test, TestingModule } from '@nestjs/testing';
import { EthersService } from './ethers.service';
import { ethers } from 'ethers';

jest.mock('ethers');

describe('EthersService', () => {
  let service: EthersService;
  let providerMock;
  let walletMock;
  let userContractMock;
  let medicineContractMock;

  beforeEach(async () => {
    providerMock = { getNetwork: jest.fn() };
    walletMock = { connect: jest.fn() };
    userContractMock = { addUser: jest.fn(), getUserHash: jest.fn(), updateUser: jest.fn() };
    medicineContractMock = { addMedicine: jest.fn(), getMedicineHashes: jest.fn(), updateMedicine: jest.fn() };

    ethers.providers.JsonRpcProvider.mockReturnValue(providerMock);
    ethers.Wallet.mockReturnValue(walletMock);
    ethers.Contract.mockImplementation((address, abi, wallet) => {
      if (address === 'USER_CONTRACT_ADDRESS') return userContractMock;
      if (address === 'MEDICINE_CONTRACT_ADDRESS') return medicineContractMock;
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [EthersService],
    }).compile();

    service = module.get<EthersService>(EthersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a user', async () => {
    userContractMock.addUser.mockResolvedValue({ wait: jest.fn().mockResolvedValue(undefined) });

    await service.addUser('test@example.com', 'cid');
    expect(userContractMock.addUser).toHaveBeenCalledWith('test@example.com', 'cid');
  });

  it('should get user hash', async () => {
    userContractMock.getUserHash.mockResolvedValue('cid');

    const result = await service.getUserHash('test@example.com');
    expect(result).toBe('cid');
  });

  it('should update a user', async () => {
    userContractMock.updateUser.mockResolvedValue({ wait: jest.fn().mockResolvedValue(undefined) });

    await service.updateUser('test@example.com', 'cid');
    expect(userContractMock.updateUser).toHaveBeenCalledWith('test@example.com', 'cid');
  });

  it('should add a medicine', async () => {
    medicineContractMock.addMedicine.mockResolvedValue({ wait: jest.fn().mockResolvedValue(undefined) });

    await service.addMedicine('user1', 'cid');
    expect(medicineContractMock.addMedicine).toHaveBeenCalledWith('user1', 'cid');
  });

  it('should get medicine hashes', async () => {
    medicineContractMock.getMedicineHashes.mockResolvedValue(['cid1', 'cid2']);

    const result = await service.getMedicineHashes('userCid');
    expect(result).toEqual(['cid1', 'cid2']);
  });

  it('should update a medicine', async () => {
    medicineContractMock.updateMedicine.mockResolvedValue({ wait: jest.fn().mockResolvedValue(undefined) });

    await service.updateMedicine('medicine1', 'cid');
    expect(medicineContractMock.updateMedicine).toHaveBeenCalledWith('medicine1', 'cid');
  });
});
