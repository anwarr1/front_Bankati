import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../model/Transaction.model';
import { TransactionAnalytics } from '../model/TransactionAnalytics';


@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private baseUrl = 'https://transaction-service-production-1.up.railway.app/api/transactions';  // Adjust to your backend URL

    constructor(private http: HttpClient) { }

    // Method to handle creating a transaction
    traiterTransaction(transaction: Transaction): Observable<Transaction> {
        return this.http.post<Transaction>(`${this.baseUrl}`, transaction);
    }

    // Method to validate a transaction (PUT request)
    validerTransaction(id: number): Observable<Transaction> {
        return this.http.put<Transaction>(`${this.baseUrl}/${id}/valider`, {});
    }

    getRecentTransactions(id: number): Observable<TransactionAnalytics> {
        return this.http.get<TransactionAnalytics>(`${this.baseUrl}/RecentTransaction/` + id);
    }

    getSumTransactions(id: number): Observable<number> {
        return this.http.get<number>(`${this.baseUrl}/SumTransaction/` + id);
    }

    getSumVirements(id: number): Observable<number> {
        return this.http.get<number>(`${this.baseUrl}/SumVirement/` + id);
    }
}
