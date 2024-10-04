import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
const CID = require('cids');

@Injectable()
export class IpfsService {
  private algorithm = 'aes-256-cbc';
  private key = crypto.randomBytes(32);
  private iv = crypto.randomBytes(16);
  private myAccount;
  private client; 
  constructor() {
    this.initializeClient()
  }

  async initializeClient() {
    try {
      const { create } = await import('@web3-storage/w3up-client');
      this.client = await create();
      this.myAccount = await this.client.login(`naveenneelamwip@gmail.com`);
      await this.client.setCurrentSpace(`did:key:${process.env.ipfs_space}`)

      console.log('Client initialized and logged in:', this.myAccount);
      
      return true
    } catch (error) {
      console.error('Error initializing client:', error);
      return false
    }
  }


  async encryptAndStore(data: any): Promise<string> {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return await this.storeJson(encrypted)

  }


  async storeJson(userData: string): Promise<string> {
    // if(this.ipfsClientNotIntilized) await this.initializeClient(); not required as init in contructor

    const blob = new Blob([userData], {
      type: "application/json",
    });
 
    const cidObj = await this.client.uploadFile(blob);
    
    const cid = new CID(cidObj.version, cidObj.code, cidObj.multihash.bytes);
    
    const cidString = cid.toString();

    return cidString;
  }

  async retrieveAndDecrypt(cid: string) {
    // const res = await this.client.get(cid);
    // if (!res.ok) {
    //   throw new Error(`Failed to get ${cid}`);
    // }
    // const files = await res.files();
    // const file = files[0];
    const content = "await file.text();"
    return content;
  }

  async retrieveJson(cid: string) {
    const res = "await this.client.get(cid);"
    // if (!res.ok) {
    //   throw new Error(`Failed to get ${cid}`);
    // }
    // const files = await res.files();

    throw Error("Please use retrieveAndDecrypt function");
    // const file = files[0];
    const content = "Please use retrieveAndDecrypt function"
    return content;
  }

  async decryptJson(data: string): Promise<any> {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
  }

}


