import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
const CID = require('cids');

@Injectable()
export class IpfsService {
  private algorithm = 'aes-256-cbc';
  private key = Buffer.from(process.env.encryption_key, 'hex');
  private iv = Buffer.from(process.env.encryption_iv, 'hex');
  private myAccount;
  private client;
  constructor() {
    this.initializeClient()
  }

  async initializeClient() {
    if (process.env.target === 'local') {
      const { create } = await import('js-kubo-rpc-client');
      this.client = create({ url: 'http://localhost:5001' });
      console.log('Local ipfs client initialized and logged in');
    } else {
      try {
        const { create } = await import('@web3-storage/w3up-client');
        this.client = await create();
        this.myAccount = await this.client.login(`naveenneelamwip@gmail.com`);
        await this.client.setCurrentSpace(`did:key:${process.env.ipfs_space}`);
        console.log('Client initialized and logged in:', this.myAccount);
        return true
      } catch (error) {
        console.error('Error initializing client:', error);
        return false
      }
    }
  }


  async encryptAndStore(data: any): Promise<string> {
    const encrypted = await this.encryptJson(data);
    return await this.storeJson(encrypted);
  }


  async storeJson(userData: string): Promise<string> {
    // if(this.ipfsClientNotIntilized) await this.initializeClient(); not required as init in contructor
    let cidString;
    const blob = new Blob([userData], {
      type: "application/json",
    });

    if (process.env.target === 'local') {
      const added = await this.client.add(blob);
      cidString = added.cid.toString();
    } else {
      const cidObj = await this.client.uploadFile(blob);
      const cid = new CID(cidObj.version, cidObj.code, cidObj.multihash.bytes);
      cidString = cid.toString();
    }

    return cidString;
  }

  async retrieveAndDecrypt(cid: string) {
    let content;
    if (process.env.target === 'local') {
      const stream = this.client.cat(cid);
      let data = [];
  
      for await (const chunk of stream) {
        data.push(chunk);
      }
  
      const buffer = Buffer.concat(data);
      content = buffer.toString('utf-8');
    } else {
      const res = await fetch(`https://${cid}.ipfs.w3s.link`)
      content = await res.text();
    }

    return await this.decryptJson(content)
  }

  async encryptJson(data) {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
  }

  async decryptJson(data: string): Promise<any> {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
  }

}


