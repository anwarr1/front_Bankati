import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compte } from './PaiementEnLigneService.service';
import { CompteDTO } from '../model/CompteDTO'; 

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  private baseUrl = 'http://localhost:8050/api/comptes';  // Change this to your backend API URL

  constructor(private http: HttpClient) { }

  // Create a new account
  creerCompte(compte: Compte): Observable<Compte> {
    return this.http.post<Compte>(`${this.baseUrl}`, compte);
  }

  // Get account by ID
  recupererCompte(id: number): Observable<Compte> {
    return this.http.get<Compte>(`${this.baseUrl}/${id}`);
  }

  // Update an existing account
  mettreAJourCompte(id: number, compteDetails: Compte): Observable<Compte> {
    return this.http.put<Compte>(`${this.baseUrl}/${id}`, compteDetails);
  }

  // Delete an account
  supprimerCompte(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getNombreComptes(id:number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/nbrCompte/`+id);
  }
  getComptes(id:number): Observable<CompteDTO> {
    return this.http.get<CompteDTO>(`${this.baseUrl}/user/`+id);
  }
  retirerCompte(id:number,montant: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/retirer/`+id+'?montant='+montant,null);
  }
  updateUserIdByCin(cin: string, newUserId: number): Observable<any> {
    const url = `${this.baseUrl}/updateUserId`;
    const params = { cin, newUserId: newUserId.toString() };
    return this.http.put<any>(url, null, { params });
  }
}
