import { Test, TestingModule } from '@nestjs/testing';
import { MedicineService } from './medicine.service';
import { EthersService } from '../common/ethers/ethers.service';
import { IpfsService } from '../common/ipfs.service';

describe('MedicineService', () => {
  let service: MedicineService;
  let ethersService: EthersService;
  let ipfsService: IpfsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicineService,
        {
          provide: EthersService,
          useValue: {
            addMedicine: jest.fn(),
            getMedicineHashes: jest.fn(),
            updateMedicine: jest.fn(),
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

    service = module.get<MedicineService>(MedicineService);
    ethersService = module.get<EthersService>(EthersService);
    ipfsService = module.get<IpfsService>(IpfsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a medicine', async () => {
    const medicineData = { userId: 'user1', name: 'Medicine1' };
    jest.spyOn(ipfsService, 'encryptAndStore').mockResolvedValue('encryptedData');
    jest.spyOn(ipfsService, 'storeJson').mockResolvedValue('cid');
    jest.spyOn(ethersService, 'addMedicine').mockResolvedValue(undefined);

    const result = await service.addMedicine(medicineData);
    expect(result).toEqual({ message: 'Medicine added successfully' });
  });

  it('should update a medicine by id', async () => {
    const medicineId = 'medicine1';
    const updateData = { name: 'Updated Medicine' };
    jest.spyOn(service, 'getMedicineById').mockResolvedValue({ medicineId, ...updateData });
    jest.spyOn(ipfsService, 'encryptAndStore').mockResolvedValue('encryptedData');
    jest.spyOn(ipfsService, 'storeJson').mockResolvedValue('cid');
    jest.spyOn(ethersService, 'updateMedicine').mockResolvedValue(undefined);

    const result = await service.updateMedicineById(medicineId, updateData);
    expect(result).toEqual({ message: 'Medicine updated successfully' });
  });

  it('should get all medicines by email', async () => {
    const email = 'test@example.com';
    jest.spyOn(ethersService, 'getUserHash').mockResolvedValue('userCid');
    jest.spyOn(ethersService, 'getMedicineHashes').mockResolvedValue(['cid1', 'cid2']);
    jest.spyOn(ipfsService, 'retrieveJson').mockResolvedValueOnce('encryptedData1').mockResolvedValueOnce('encryptedData2');
    jest.spyOn(ipfsService, 'decryptJson').mockResolvedValueOnce({ name: 'Medicine1' }).mockResolvedValueOnce({ name: 'Medicine2' });

    const result = await service.getAllMedicinesByEmail(email);
    expect(result).toEqual([{ name: 'Medicine1' }, { name: 'Medicine2' }]);
  });
});
