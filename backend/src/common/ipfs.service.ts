import { Injectable } from '@nestjs/common';
import { create } from '@web3-storage/w3up-client'
import * as crypto from 'crypto';

@Injectable()
export class IpfsService {
  private algorithm = 'aes-256-cbc';
  private key = crypto.randomBytes(32);
  private iv = crypto.randomBytes(16);

  constructor() {}

  async encryptAndStore(data: any): Promise<string> {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  
  async storeJson(data: string): Promise<string> {
    const client = await create()
    const myAccount = await client.login('naveenneelamwip@gmail.com')

    const file = new File([data], 'data.json', { type: 'application/json' });
    const cid = "//await this.client.put([file]);"
    return cid;
  }

  async retrieveJson(cid: string): Promise<string> {
    // const client = await create()
    // const myAccount = await client.login('naveenneelamwip@gmail.com')

    const res = "await this.client.get(cid);"
    // if (!res.ok) {
    //   throw new Error(`Failed to get ${cid}`);
    // }
    // const files = await res.files();
    // const file = files[0];
    const content = "await file.text();"
    return content;
  }

  async decryptJson(data: string): Promise<any> {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
  }
  
  // old encryption approach
  // private key = CryptoJS.enc.Utf8.parse('4512631236589784');
  // private iv = CryptoJS.enc.Utf8.parse('4512631236589784');
  // private encryptionMethod = 'AES-256-CBC';

  // async encrypt(plainData: string): Promise<string> {
  //     const encryptor = CryptoJS.AES.encrypt(plainData, this.key, {
  //         iv: this.iv,
  //         mode: CryptoJS.mode.CBC,
  //         padding: CryptoJS.pad.Pkcs7,
  //     });
  //     return encryptor.toString();
  // }

  // async decrypt(encryptedData: string): Promise<string> {
  //     const decryptor = CryptoJS.AES.decrypt(encryptedData, this.key, {
  //         iv: this.iv,
  //         mode: CryptoJS.mode.CBC,
  //         padding: CryptoJS.pad.Pkcs7,
  //     });
  //     return decryptor.toString(CryptoJS.enc.Utf8);
  // }

}


