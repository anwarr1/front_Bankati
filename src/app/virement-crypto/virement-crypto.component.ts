import { Component ,OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import { CryptoWalletServiceService } from '../service/crypto-wallet-service.service';
import { AuthService } from '../service/Auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-virement-crypto',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule,HttpClientModule],
  templateUrl: './virement-crypto.component.html',
  styleUrl: './virement-crypto.component.css'
})
export class VirementCryptoComponent implements OnInit {

  beneficiaryRIB: number = 0;
  amount: number = 0;
  reason: string = '';
  executionDate: string = 'Maintenant';
  recurringOrder: boolean = false;
  isModalOpen: boolean = false;
  beneficiaryType:string ='';
  newBeneficiaryName: string = '';
  newBeneficiaryFirstName: string = '';
  newBeneficiaryRIB: string = '';
  password = '';
  passwordVisible = false;

  constructor(private cryptoWallet: CryptoWalletServiceService, private router: Router, private authService: AuthService) { }
  ngOnInit(): void {
      
  }
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  openBeneficiaryModal() {
    this.isModalOpen = true;
  }
  closeBeneficiaryModal() {
    this.isModalOpen = false;
  }
  addNewBeneficiary(){
    if (!this.beneficiaryType){
      alert('Please select a beneficiary Type.');
    }
    if (!this.newBeneficiaryName) {
      alert('Please enter beneficiary Name.');
    }
    if (!this.newBeneficiaryFirstName) {
      alert('Please enter beneficiary first Name.');
    }
    if (!this.newBeneficiaryRIB) {
      alert('Please enter a beneficiary RIB.');
    }
    this.isModalOpen = false;

    console.log('New Beneficiary added:');
    console.log('Beneficiary Type:', this.beneficiaryType);
    console.log('Beneficiary Name:', this.newBeneficiaryName);
    console.log('Beneficiary first Name:', this.newBeneficiaryFirstName);
    console.log('Beneficiary RIB:', this.newBeneficiaryRIB);
    alert('New Beneficiary added!');
    // Implement your logic here to save a new beneficiary
  }
  openDatePicker(){
    alert('Open date picker')
    // Implement your date picker logic here
  }

  transfer() {
    // Implement your transfer logic here
    if (!this.beneficiaryRIB) {
      alert('Please enter the beneficiary RIB.');
      return;
    }
    if (!this.amount || this.amount <= 0) {
      alert('Please enter a valid transfer amount.');
      return;
    }
    this.cryptoWallet.verify(1,this.password).subscribe((response) => {
      if (response) {
        this.cryptoWallet.transfererCryptoWallet(1, this.beneficiaryRIB, this.amount, 'BTC').subscribe((response) => {  
          alert('Transfer successful!');
        });
      } else {
        alert('Password Incorrect !');
      };
  });
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
