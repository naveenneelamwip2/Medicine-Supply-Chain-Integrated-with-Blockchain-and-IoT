import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { userContractAbi, medicineContractAbi } from './contract_abi'

@Injectable()
export class EthersService {

  private provider_url = process.env.provider_url
  private provider_key = process.env.provider_key

  private contractAddress = process.env.user_contract;

  private provider = new ethers.JsonRpcProvider(this.provider_url)
  private signer = new ethers.Wallet(this.provider_key, this.provider)

  private userAddress = this.signer.address;

  private userContract = new ethers.Contract(this.contractAddress, userContractAbi, this.provider)
  private userContractWithSigner = this.userContract.connect(this.signer) as any;
 
  private medicineContract = new ethers.Contract(this.contractAddress, medicineContractAbi, this.provider)
  private medicineContractWithSigner = this.medicineContract.connect(this.signer) as any;
  
  async addUser(email: string, cid: string) {
    const tx = await this.userContract.addUser(email, cid);
    await tx.wait();
  }

  async getUserHash(email: string): Promise<string> {
    return await this.userContract.getUserHash(email);
  }

  async updateUser(email: string, cid: string) {
    const tx = await this.userContract.updateUser(email, cid);
    await tx.wait();
  }

  async addMedicine(userId: string, cid: string) {
    const tx = await this.medicineContract.addMedicine(userId, cid);
    await tx.wait();
  }

  async getMedicineHashes(userCid: string): Promise<string[]> {
    return await this.medicineContract.getMedicineHashes(userCid);
  }

  async getMedicineHash(medicineId:string, userCid: string): Promise<string[]> {
    let allUsrMedicines = await this.medicineContract.getMedicineHash(userCid);

    return allUsrMedicines.filter(medicine=>medicineId === medicine.medicineId)
  }

  async updateMedicine(medicineId: string, cid: string) {
    const tx = await this.medicineContract.updateMedicine(medicineId, cid);
    await tx.wait();
  }
}
