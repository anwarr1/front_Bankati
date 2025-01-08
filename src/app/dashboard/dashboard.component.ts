import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../service/TransactionService.service';
import { TransactionAnalytics } from '../model/TransactionAnalytics';
import { forkJoin } from 'rxjs';
import { CompteService } from '../service/CompteService.service';
import { PortefeuilleService } from '../service/PortefeuilleService.service';
import { SharedDataServiceService } from '../service/shared-data-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/Auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink, CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  transactions: any;
  sum_tr: number = 0;
  sum_vr: number = 0;
  nbr_compte: number = 0;
  portefeuilles: any;
  comptes: any;
  isLoading: boolean = true;
  userId: number=1;
  

  constructor(private transactionService: TransactionService,private compteService: CompteService,private portefeuilleService: PortefeuilleService,private sharedDataService : SharedDataServiceService,
    private router: Router, private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userId = this.sharedDataService.getUserId();

    forkJoin({
      transactions: this.transactionService.getRecentTransactions(this.userId),
      sumTransactions: this.transactionService.getSumTransactions(this.userId),
      sumVirements: this.transactionService.getSumVirements(this.userId),
      nbrCompte : this.compteService.getNombreComptes(this.userId),
      portefeuille : this.portefeuilleService.getPortefeuille(this.userId),
      comptes: this.compteService.getComptes(this.userId)
    }).subscribe(
      ({ portefeuille,transactions, sumTransactions, sumVirements, nbrCompte,comptes}) => {
        this.portefeuilles = portefeuille;
        this.transactions = transactions;
        this.sum_tr = sumTransactions ?? 0;
        this.sum_vr = sumVirements ?? 0;
        this.nbr_compte = nbrCompte ?? 0;
        this.comptes = comptes;
        this.sharedDataService.setComptes(comptes);
        this.sharedDataService.setPortefeuilles(portefeuille);
        this.isLoading = false; // Désactiver le chargement
        console.log('All data fetched:', { portefeuille,transactions, sumTransactions, sumVirements, nbrCompte });
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false; 
      }
    );
  }

  getSumTransactions(): void {
    this.transactionService.getSumTransactions(1).subscribe(
      (sum) => {
        if(sum == null){
          sum = 0;
        }
        this.sum_tr = sum;
        console.log(sum);
      },
      (error) => {
        console.error('Error fetching sum:', error);
      }
    );
  }

  getSumVirement(): void {
    this.transactionService.getSumVirements(1).subscribe(
      (sum) => {
        if(sum == null){
          sum = 0;
        }
        this.sum_vr = sum;
        console.log(sum);
      },
      (error) => {
        console.error('Error fetching sum:', error);
      }
    );
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
  
    // Obtenir les composants de la date
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
  
    // Formater la date
    const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date);
  
    return formattedDate;
  }
  logout() {
    console.log('Bouton Logout cliqué'); // Vérifiez que ce message s'affiche
  
    // Assurez-vous que logout() du service AuthService fonctionne bien
    this.authService.logout().subscribe({
      next: (response) => {
        console.log(response.message); // Vérifiez la réponse du backend
    
        // Effacer les éléments de session
        sessionStorage.clear();
    
        // Navigation après la déconnexion
        this.router.navigate(['/login1']).then(() => {
          console.log('Navigation réussie vers la page de login');
        }).catch((error) => {
          console.error('Erreur lors de la navigation', error);
        });
      },
      error: (err) => {
        console.error('Erreur lors de la déconnexion', err);
      }
    });
  }
}
