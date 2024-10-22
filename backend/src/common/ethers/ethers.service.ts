import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { userContractAbi, medicineContractAbi } from './contract_abi'

@Injectable()
export class EthersService {

  private provider_url = process.env.provider_url
  private provider_key = process.env.provider_key

  private userContractAddress = process.env.user_contract;
  private medicineContractAddress = process.env.medicine_contract;

  private provider = new ethers.JsonRpcProvider(this.provider_url)
  private signer = new ethers.Wallet(this.provider_key, this.provider)

  private userAddress = this.signer.address;

  private userContract = new ethers.Contract(this.userContractAddress, userContractAbi, this.provider)
  private userContractWithSigner = this.userContract.connect(this.signer) as any;

  private medicineContract = new ethers.Contract(this.medicineContractAddress, medicineContractAbi, this.provider)
  private medicineContractWithSigner = this.medicineContract.connect(this.signer) as any;

  async addUser(email: string, cid: string) {
    const tx = await this.userContractWithSigner.addUser(email, cid);
    return await tx.wait();
  }

  async getUserCid(email: string): Promise<string> {
    return await this.userContractWithSigner.getUserCid(email);
  }

  async updateUser(email: string, cid: string) {
    const tx = await this.userContractWithSigner.updateUserDetails(email, cid);
    return await tx.wait();
  }

  async addMedicine(userCid: string, medicineId:string, medicineCid: string) {
    const tx = await this.medicineContractWithSigner.addMedicine(userCid, medicineId, medicineCid);
    return await tx.wait();
  }

  async getMedicineHistory(userCid: string, medicineId: string): Promise<string[]> {
    return await this.medicineContractWithSigner.getMedicineHistory(userCid, medicineId);
  }

  async updateMedicine(userCid: string, medicineId: string, medicineCid: string) {
    const tx = await this.medicineContractWithSigner.updateMedicine(userCid, medicineId, medicineCid);
    return await tx.wait();
  }

  async getAllUserMedicineEvents(userCid: string): Promise<[]> {
    const filter = this.medicineContractWithSigner.filters.MedicineEvt(userCid);
    const events = await this.medicineContractWithSigner.queryFilter(filter, 0, 'latest');
    return events;
  }
}
