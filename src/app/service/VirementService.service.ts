import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Virement } from '../model/Virement.model';
import { VirementRequest } from '../model/VirementRequest.model';
import { Compte } from './PaiementEnLigneService.service';


@Injectable({
    providedIn: 'root'
})
export class VirementService {
    private baseUrl = 'https://transaction-service-production-1.up.railway.app/api/virements';  // Change to your API URL
    private test = 'https://transaction-service-production-1.up.railway.app/api/virements/test';  // Change to your API URL

    constructor(private http: HttpClient) { }

    // Method to perform a virement (money transfer)
    effectuerVirement(virementRequest: VirementRequest): Observable<Virement> {
        return this.http.post<Virement>(`${this.baseUrl}`, virementRequest);
    }
    getCompteByRib(rib: String): Observable<Compte> {
        return this.http.get<Compte>(`${this.baseUrl}/${rib}`);
    }
    testF(): Observable<any> {
        return this.http.get("/api/factures/test");
    }
}