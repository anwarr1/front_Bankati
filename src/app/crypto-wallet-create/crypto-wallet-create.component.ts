import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CryptoWalletService, CryptoWalletDTO } from '../service/crypto-wallet.service';
import { SharedDataServiceService } from '../service/shared-data-service.service';

interface Account {
  id: string;
  accountNumber: string;
  balance: number;
}

@Component({
  selector: 'app-crypto-wallet-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crypto-wallet-create.component.html',
  styleUrls: ['./crypto-wallet-create.component.css']
})
export class CryptoWalletCreateComponent implements OnInit {
  accounts: Account[] = [];
  selectedAccount: string = '';
  amount: number = 0;
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private router: Router,
    private cryptoWalletService: CryptoWalletService,
    private sharedDataService: SharedDataServiceService
  ) {}

  ngOnInit() {
    this.accounts = [
      { id: '1', accountNumber: 'COMPTE-001', balance: 1000 },
      { id: '2', accountNumber: 'COMPTE-002', balance: 2000 }
    ];
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }

    const walletDTO: CryptoWalletDTO = {
      utilisateurId: this.sharedDataService.getUserId(), // Assurez-vous que c'est le bon ID utilisateur
      devise: 'BTC', // ou la devise sélectionnée
      solde: this.amount,
      mdp: this.password
    };

    this.cryptoWalletService.genererCryptoWallet(walletDTO).subscribe({
      next: (response) => {
        this.sharedDataService.setCryptowalletId(response.id);
        this.sharedDataService.setWallet(response);
        this.successMessage = 'Wallet créé avec succès !';
        setTimeout(() => {
          this.router.navigate(['/crypto-wallet-dashboard']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la création du wallet : ' + error.message;
      }
    });
  }
}
