import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CryptoWalletService } from '../service/crypto-wallet.service';
import { SharedDataServiceService } from '../service/shared-data-service.service';
import { CompteService } from '../service/CompteService.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Compte } from '../model/Compte.model';
import { PortefeuilleService } from '../service/PortefeuilleService.service';
@Component({
  selector: 'app-crypto-wallet-trade',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './crypto-wallet-trade.component.html',
  styleUrls: ['./crypto-wallet-trade.component.css']
})
export class CryptoWalletTradeComponent implements OnInit {
  isSellingMode: boolean = false;
  amount: number = 0;
  password: string = '';
  errorMessage: string = '';
  walletId: number = 0;
  selectedCompteId: number = 0;
  rate: number = 960401.31;
  walletBalance: number = 0;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  confirmPassword: string = '';
  selectedCompte: Compte | null = null;
  comptes:any;
  compte: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cryptoWalletService: CryptoWalletService,
    private sharedDataService: SharedDataServiceService,
    private compteService: CompteService,
    private portefeuilleService: PortefeuilleService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.isSellingMode = params['action'] === 'sell';
      this.walletId = Number(this.route.snapshot.paramMap.get('id'));
      this.loadWalletData();
      this.comptes = this.sharedDataService.getComptes();
    });
  }

  loadWalletData() {
    this.cryptoWalletService.getCryptoWallet(this.walletId).subscribe({
      next: (wallet) => {
        this.walletBalance = wallet.solde || 0;
      },
      error: (error) => {
        console.error('Error loading wallet:', error);
        this.errorMessage = 'Erreur lors du chargement du wallet';
      }
    });
  }

  

  
  canProceedWithTransaction(): boolean {
    if (!this.selectedCompte) return false;
    const totalAmount = this.amount * this.rate;
    return totalAmount <= this.selectedCompte.solde;
  }

  verifyPasswordAndProceed() {
    if (!this.selectedCompteId) {
      this.errorMessage = 'Veuillez sélectionner un compte';
      return;
    }

    this.cryptoWalletService.verifyPassword(this.password).subscribe({
      next: (wallet) => {
        if (wallet != null) {
          this.processTrade();
        } else {
          this.errorMessage = 'Mot de passe incorrect';
        }
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la vérification du mot de passe : ' + error.message;
      }
    });
  }

  processTrade() {
    if (this.isSellingMode) {
      this.processSell();
    } else {
      this.processBuy();
    }
  }

  processBuy() {
    // 1. D'abord acheter la crypto
    this.cryptoWalletService.acheterCryptoWallet(this.sharedDataService.getWallet().id, this.amount).subscribe({
      next: (updatedWallet) => {
        // 2. Sauvegarder le wallet mis à jour
        this.sharedDataService.setWallet(updatedWallet);

        // 3. Mettre à jour le compte
        this.portefeuilleService.retirer(this.sharedDataService.getPortefeuilles().id, this.amount*this.rate).subscribe({
              next: (portefeuille) => {
                  this.sharedDataService.setPortefeuilles(portefeuille);

                // 5. Récupérer les transactions mises à jour
                this.cryptoWalletService.getTransaction(this.walletId).subscribe({
                  next: (transactions) => {
                    this.sharedDataService.setTransactions(transactions);
                    // 6. Rediriger vers le dashboard
                    this.router.navigate(['/crypto-wallet-dashboard']);
                  },
                  error: (error) => {
                    console.error('Erreur lors de la récupération des transactions:', error);
                    this.errorMessage = 'Erreur lors de la mise à jour des transactions';
                  }
                });
              },
              error: (error) => {
                console.error('Erreur lors de la mise à jour du compte:', error);
                this.errorMessage = 'Erreur lors de la mise à jour du compte';
              }
            });
          },
          error: (error) => {
            console.error('Erreur lors de la récupération du compte:', error);
            this.errorMessage = 'Erreur lors de la récupération du compte';
          }
        });
      }

  processSell() {
    // Implémentation similaire pour la vente
    // À implémenter si nécessaire
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }

    if (!this.canProceedWithTransaction()) {
      this.errorMessage = 'Le montant dépasse le solde disponible du compte';
      return;
    }
    
    if (this.isSellingMode) {
      this.processSell();
    } else {
      this.processBuy();
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  cancel() {
    this.router.navigate(['/crypto-wallet-dashboard']);
  }
}
