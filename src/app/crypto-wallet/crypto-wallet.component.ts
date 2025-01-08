import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import { Router, RouterLink} from '@angular/router';
import { AuthService } from '../service/Auth.service';


@Component({
  selector: 'app-crypto-wallet',
  standalone: true,
  imports: [RouterLink, FormsModule, NgForOf],
  templateUrl: './crypto-wallet.component.html',
  styleUrl: './crypto-wallet.component.css'
})
export class CryptoWalletComponent {
  constructor(private router: Router, private  authService: AuthService) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
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
