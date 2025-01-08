import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataServiceService {

  constructor() { }
  private comptes: any;
  private portefeuilles: any;
  private userId = 1;
  private cryptowalletId: number = 1;
  private cryptowallet: any;
  private transactions: any;

  setPortefeuilles(data: any): void {
    this.portefeuilles = data;
  }

  getPortefeuilles(): any {
    return this.portefeuilles;
  }

  setComptes(data: any): void {
    this.comptes = data;
  }

  getComptes(): any {
    return this.comptes;
  }

  setUserId(id: number): void {
    this.userId = id;
  }

  getUserId(): number {
    return this.userId;
  }

  setCryptowalletId(id: number): void {
    this.cryptowalletId = id;
  }

  getCryptowalletId(): number {
    return this.cryptowalletId;
  }

  setWallet(wallet: any): void {
    this.cryptowallet = wallet;
  }

  getWallet(): any {
    return this.cryptowallet;
  }

  clearWallet(): void {
    this.cryptowallet = null;
    this.cryptowalletId = 0;
  }
  getTransactions(): any {
    return this.transactions;
  }
  setTransactions(transactions: any): void {
    this.transactions = transactions;
  }
}
