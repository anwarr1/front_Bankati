import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionCrypto } from '../model/Transaction_Crypto.model';

export interface CryptoWallet {
  id: number;
  utilisateurId: number;
  devise: string;
  solde: number;
  mdp: string;
}

export interface CryptoWalletDTO {
  utilisateurId: number;
  devise: string;
  solde: number;
  mdp: string;
}

@Injectable({
  providedIn: 'root'
})
export class CryptoWalletService {
  private baseUrl = 'http://localhost:8043/gestion_portefeuille/cryptoWallet'; // Ajustez l'URL selon votre configuration

  constructor(private http: HttpClient) { }

  // Créer un nouveau wallet
  genererCryptoWallet(wallet: CryptoWalletDTO): Observable<CryptoWallet> {
    return this.http.post<CryptoWallet>(`${this.baseUrl}/generer`, wallet);
  }

  // Acheter des cryptos
  acheterCryptoWallet(id: number, somme: number): Observable<CryptoWallet> {
    const params = new HttpParams()
      .set('id', id.toString())
      .set('somme', somme.toString());
    return this.http.post<CryptoWallet>(`${this.baseUrl}/acheter`, null, { params });
  }

  // Vendre des cryptos
  vendreCryptoWallet(id: number, somme: number): Observable<CryptoWallet> {
    const params = new HttpParams()
      .set('id', id.toString())
      .set('somme', somme.toString());
    return this.http.post<CryptoWallet>(`${this.baseUrl}/vendre`, null, { params });
  }

  // Transfert de cryptos
  transfertCryptoWallet(idDebit: number, idCredit: number, somme: number, devise: string): Observable<CryptoWallet> {
    const params = new HttpParams()
      .set('id_debit', idDebit.toString())
      .set('id_credit', idCredit.toString())
      .set('somme', somme.toString())
      .set('devise', devise);
    return this.http.post<CryptoWallet>(`${this.baseUrl}/transfert`, null, { params });
  }

  // Obtenir un wallet par ID
  getCryptoWallet(id: number): Observable<CryptoWallet> {
    return this.http.get<CryptoWallet>(`${this.baseUrl}/${id}`);
  }

  // Obtenir tous les wallets d'un utilisateur
  getWalletsByUtilisateur(id: number): Observable<CryptoWallet[]> {
    return this.http.get<CryptoWallet[]>(`${this.baseUrl}/utilisateur/${id}`);
  }

  // Vérifier le mot de passe
  verifyPassword(mdp: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/verify?mdp=${mdp}`);
  }
  getTransaction(id:number){
    return this.http.get<TransactionCrypto[]>(`${this.baseUrl}/transaction?id=${id}`);
  }
}
