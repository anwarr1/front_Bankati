import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Compte {
    id: number;
    solde: number;
}

export interface PaiementEnLigne {
    id?: number;
    compte: Compte;
    montant: number;
}

@Injectable({
    providedIn: 'root',
})
export class PaiementEnLigneService {
    private baseUrl = 'https://transaction-service-production-1.up.railway.app/api/paiements'; // Adjust the URL to match your backend endpoint

    constructor(private http: HttpClient) { }

    // Perform a payment
    effectuerPaiement(paiement: PaiementEnLigne): Observable<PaiementEnLigne> {
        return this.http.post<PaiementEnLigne>(this.baseUrl, paiement);
    }
}
