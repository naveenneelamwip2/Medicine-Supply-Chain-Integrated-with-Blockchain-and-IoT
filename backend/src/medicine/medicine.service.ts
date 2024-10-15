import { Inject, Injectable } from '@nestjs/common';
import { EthersService } from '../common/ethers.service';
import { IpfsService } from '../common/ipfs.service';
import * as crypto from 'crypto';
import { ethers } from 'ethers';
import { medicineContractAbi } from 'src/common/contract_abi';

@Injectable()
export class MedicineService {
  private ifaceMedicineContract = new ethers.Interface(medicineContractAbi);

  constructor(
    private readonly ethersService: EthersService,
    @Inject(IpfsService) private readonly ipfsService: IpfsService,
  ) {}

  async addMedicine(email: string, medicineData) {

    medicineData.lastUpdatedDate = new Date();
    let length = 10
    medicineData.medicineId = crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);

    const userCid = await this.ethersService.getUserCid(email);
    if(!userCid) return { status: 401, message: 'User not found in blockchain', data: email };
    const medicineCid = await this.ipfsService.encryptAndStore(medicineData);
    let tx = await this.ethersService.addMedicine(userCid, medicineData.medicineId, medicineCid);
    return { status:201, message: 'Medicine added successfully', data: {tx, medicineData, cid: medicineCid} };
  }

  async updateMedicineById(email: string, updateData) {
    updateData.lastUpdatedDate = new Date().toString();
    const userCid = await this.ethersService.getUserCid(email);
    const MedicineDoc = await this.getMedicineById(userCid, updateData.medicineId);
    Object.assign(MedicineDoc, updateData);
    const newMedicineCid = await this.ipfsService.encryptAndStore(MedicineDoc);
    const tx = await this.ethersService.updateMedicine(userCid, updateData.medicineId, newMedicineCid);
    return { status:201, message: 'Medicine updated successfully', data: {tx, MedicineDoc, cid: newMedicineCid} };
  }

  async getAllMedicinesByEmail(email: string) {
    const userCid = await this.ethersService.getUserCid(email);
    const medicineEvents = await this.ethersService.getAllUserMedicineEvents(userCid);
    const medicines = await this.decodeEventAndRetrieveDocs(userCid, medicineEvents)
    return { status:201, message: 'Retrieved all user medicines successfully', data: medicines };
  }

  private async getMedicineById(userCid:string, medicineId: string) {
    const medicineCids = await this.ethersService.getMedicineHistory(userCid, medicineId);
    const medicineDoc = await this.ipfsService.retrieveAndDecrypt(medicineCids[0]);
    return medicineDoc
  }

  private async decodeEventAndRetrieveDocs(userCid, medicineEvents) {  
    let medicines = [];

    await Promise.all(medicineEvents.map(async event => {
        const evtargs = this.ifaceMedicineContract.decodeEventLog("MedicineEvt", event.data);
        let medicineDoc = await this.getMedicineById(userCid, evtargs[2]);
        medicines.push(medicineDoc);
    }))

    return medicines
  }
}
