import { Test, TestingModule } from '@nestjs/testing';
import { IpfsService } from './ipfs.service';
import { create } from '@web3-storage/w3up-client'
import * as crypto from 'crypto';

jest.mock('web3.storage');
jest.mock('crypto');

describe('IpfsService', () => {
  let service: IpfsService;
  let clientMock;

  beforeEach(async () => {
    clientMock = {
      put: jest.fn(),
      get: jest.fn(),
    };
    // Web3Storage.mockReturnValue(clientMock);

    const module: TestingModule = await Test.createTestingModule({
      providers: [IpfsService],
    }).compile();

    service = module.get<IpfsService>(IpfsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should encrypt and store data', async () => {
    const data = { key: 'value' };
    const cipherMock = {
      update: jest.fn().mockReturnValue('encrypted'),
      final: jest.fn().mockReturnValue('data'),
    };
    crypto.createCipher.mockReturnValue(cipherMock);

    const result = await service.encryptAndStore(data);
    expect(result).toBe('encrypteddata');
  });

  it('should store JSON data on IPFS', async () => {
    const data = 'encryptedData';
    clientMock.put.mockResolvedValue('cid');

    const result = await service.storeJson(data);
    expect(result).toBe('cid');
  });

  it('should retrieve JSON data from IPFS', async () => {
    const cid = 'cid';
    const fileMock = {
      text: jest.fn().mockResolvedValue('data'),
    };
    clientMock.get.mockResolvedValue({
      ok: true,
      files: jest.fn().mockResolvedValue([fileMock]),
    });

    const result = await service.retrieveJson(cid);
    expect(result).toBe('data');
  });

  it('should decrypt JSON data', async () => {
    const data = 'encrypteddata';
    const decipherMock = {
      update: jest.fn().mockReturnValue('decrypted'),
      final: jest.fn().mockReturnValue('data'),
    };
    crypto.createDecipher.mockReturnValue(decipherMock);

    const result = await service.decryptJson(data);
    expect(result).toEqual({ key: 'value' });
  });
});
