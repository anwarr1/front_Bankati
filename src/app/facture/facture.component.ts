import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { Facture } from '../model/Facture.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PaiementFacture } from '../model/PaiementFacture.model';
import { FactureService } from '../service/FactureService.service';
import { PaiementFactureService } from '../service/PaiementFacture.service';
import { TypeService } from '../model/enum/TypeService.enum';
import { SharedDataServiceService } from '../service/shared-data-service.service';
import { AuthService } from '../service/Auth.service';

@Component({
  selector: 'app-facture',
  standalone: true,
  imports: [
    RouterLink,
    HttpClientModule,
    CommonModule


  ],
  templateUrl: './facture.component.html',
  styleUrl: './facture.component.css'
})
export class FactureComponent implements OnInit {
  factures: any;

  constructor(private factureService: FactureService, private paiementFactureService: PaiementFactureService, private router: Router, private sharedDataService: SharedDataServiceService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getFactures();
    console.log('Factures récupérées', this.factures);
  }
  isLoading = false;

  getFactures(): void {
    this.isLoading = true;

    this.factureService.recupererFactureByUser(this.sharedDataService.getUserId()).subscribe(facture => {
      this.factures = facture;
      this.isLoading = false;
    }, error => {
      console.error('Erreur lors de la récupération des factures', error);
      this.isLoading = false;
    }
    );
  }
  payerFacture(facture: Facture): void {
    this.isLoading = true;

    const paiementFacture: PaiementFacture = {
      compte: {
        id: 1,
        solde: 0,
        devise: '',
        idUser: 0,
        rib: '08023000000000905'
      },
      facture: facture,
      idUser: this.sharedDataService.getUserId(),
    };

    this.paiementFactureService.traiterPaiement(paiementFacture).subscribe(response => {
      console.log('Paiement effectué avec succès', response);
      this.router.navigate([this.router.url]);
      this.isLoading = false;

      // Update the facture status or refresh the list
      this.getFactures();
    }, error => {
      console.error('Erreur lors du paiement', error);
      this.isLoading = false;

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