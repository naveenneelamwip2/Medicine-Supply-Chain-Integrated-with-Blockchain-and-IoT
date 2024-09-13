import { Injectable } from '@nestjs/common';
import { EthersService } from '../common/ethers.service';
import { IpfsService } from '../common/ipfs.service';

@Injectable()
export class MedicineService {
  constructor(
    private readonly ethersService: EthersService,
    private readonly ipfsService: IpfsService,
  ) {}

  async addMedicine(medicineData) {
    const encryptedMedicineJson = await this.ipfsService.encryptAndStore(medicineData);
    const cid = await this.ipfsService.storeJson(encryptedMedicineJson);
    await this.ethersService.addMedicine(medicineData.userId, cid);
    return { message: 'Medicine added successfully' };
  }

  async updateMedicineById(medicineId: string, updateData) {
    const medicine = await this.getMedicineById(medicineId, updateData.userCid);
    Object.assign(medicine, updateData);
    const encryptedMedicineJson = await this.ipfsService.encryptAndStore(medicine);
    const cid = await this.ipfsService.storeJson(encryptedMedicineJson);
    await this.ethersService.updateMedicine(medicineId, cid);
    return { message: 'Medicine updated successfully' };
  }

  async getAllMedicinesByEmail(email: string) {
    const userCid = await this.ethersService.getUserHash(email);
    const medicineCids = await this.ethersService.getMedicineHashes(userCid);
    const medicines = await Promise.all(medicineCids.map(cid => this.ipfsService.retrieveJson(cid)));
    return medicines.map(medicine => this.ipfsService.decryptJson(medicine));
  }

  private async getMedicineById(medicineId: string, userCid:string) {
    const cid = await this.ethersService.getMedicineHash(medicineId, userCid);
    const encryptedMedicineJson = await this.ipfsService.retrieveJson(cid[0]);
    return this.ipfsService.decryptJson(encryptedMedicineJson);
  }
}
