import { Injectable } from '@nestjs/common';
import { EthersService } from '../common/ethers.service';
import { IpfsService } from '../common/ipfs.service';
import * as crypto from 'crypto';

@Injectable()
export class MedicineService {
  constructor(
    private readonly ethersService: EthersService,
    private readonly ipfsService: IpfsService,
  ) {}

  async addMedicine(email: string, medicineData) {

    medicineData.lastUpdatedDate = new Date();
    let length = 10
    medicineData.medicineId = crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);

    const userCid = await this.ethersService.getUserCid(email);
    const medicineCid = await this.ipfsService.encryptAndStore(medicineData);
    await this.ethersService.addMedicine(userCid, medicineData.medicineId, medicineCid);
    return { message: 'Medicine added successfully' };
  }

  async updateMedicineById(email: string, updateData) {
    const userCid = await this.ethersService.getUserCid(email);
    const oldMedicineDoc = await this.getMedicineById(updateData.medicineId, userCid);
    Object.assign(oldMedicineDoc, updateData);
    const newMedicineCid = await this.ipfsService.encryptAndStore(oldMedicineDoc);
    await this.ethersService.updateMedicine(userCid, updateData.medicineId, newMedicineCid);
    return { message: 'Medicine updated successfully' };
  }

  async getAllMedicinesByEmail(email: string) {
    const userCid = await this.ethersService.getUserCid(email);
    const medicineEvents = await this.ethersService.getAllUserMedicineEvents(userCid);
    let medicines = []
    medicineEvents.forEach(async event => {
        let medicineDoc = this.getMedicineById(userCid, event.args.medicineId)
        medicines.push(medicineDoc)
    });

    return medicines
  }

  private async getMedicineById(userCid:string, medicineId: string) {
    const medicineCids = await this.ethersService.getMedicineHistory(userCid, medicineId);
    const medicineDoc = await this.ipfsService.retrieveAndDecrypt(medicineCids[0]);
    return medicineDoc
  }
}
