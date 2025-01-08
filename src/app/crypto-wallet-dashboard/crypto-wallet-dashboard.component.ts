import { Component, OnInit } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedDataServiceService } from '../service/shared-data-service.service';

interface Transaction {
  date: Date;
  type: 'ACHAT' | 'VENTE';
  amount: number;
  status: 'EN_COURS' | 'COMPLETE' | 'ANNULE';
}

@Component({
  selector: 'app-crypto-wallet-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './crypto-wallet-dashboard.component.html',
  styleUrls: ['./crypto-wallet-dashboard.component.css']
})
export class CryptoWalletDashboardComponent implements OnInit {
  walletBalance: number = 1000;
  walletPassword: string = 'MonMotDePasse123';
  showPassword: boolean = false;
  cryptoBought: number = 5;
  cryptoSold: number = 2;
  transactions: any;
  wallet: any;
  constructor(private router: Router, private sharedDataService: SharedDataServiceService) {}

  ngOnInit() {
    
    this.wallet = this.sharedDataService.getWallet();
    this.transactions = this.sharedDataService.getTransactions();
    console.log(this.transactions);
    
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'COMPLETE':
        return 'bg-success';
      case 'EN_COURS':
        return 'bg-warning';
      case 'ANNULE':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  navigateToBuy() {
    this.router.navigate(['/crypto-wallet-trade'], { queryParams: { action: 'buy' } });
  }

  navigateToSell() {
    this.router.navigate(['/crypto-wallet-trade'], { queryParams: { action: 'sell' } });
  }
}
