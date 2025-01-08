import { Component } from '@angular/core';
import { Router , RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedDataServiceService } from '../service/shared-data-service.service';
import { CryptoWalletService } from '../service/crypto-wallet.service';
@Component({
  selector: 'app-crypto-wallet-login',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './crypto-wallet-login.component.html',
  styleUrls: ['./crypto-wallet-login.component.css']
})
export class CryptoWalletLoginComponent {
  password: string = '';
  showPassword: boolean = false;

  constructor(private router: Router ,private sharedDataService: SharedDataServiceService,private cryptoWaleltService: CryptoWalletService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.cryptoWaleltService.verifyPassword(this.password).subscribe({
      next: (wallet) => {
        if (wallet === null) {
          alert('Mot de passe incorrect');
          return;
        }
        console.log(wallet);
        // Récupérer d'abord les transactions
        this.cryptoWaleltService.getTransaction(wallet.id).subscribe({
          next: (transactions) => {
            // Une fois les transactions récupérées, on met à jour le wallet et les transactions
            this.sharedDataService.setTransactions(transactions);
            this.sharedDataService.setWallet(wallet);
            // Puis on redirige vers le dashboard
            this.router.navigate(['/crypto-wallet-dashboard']);
          },
          error: (error) => {
            console.error('Error fetching transactions:', error);
            alert('Erreur lors de la récupération des transactions');
          }
        });
      },
      error: (error) => {
        alert('Mot de passe incorrect');
      }
    });
  }
}
