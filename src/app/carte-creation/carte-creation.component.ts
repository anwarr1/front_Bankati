import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CarteVirtuelleService } from '../service/CarteVirtuelleService.service';
import { Router, RouterLink } from '@angular/router';
import { CarteVirtuelle } from '../model/CarteVirtuelle.model';
import { PortefeuilleService } from '../service/PortefeuilleService.service';
import { Devise } from '../model/devise.enum';
import { CompteService } from '../service/CompteService.service';
import { SharedDataServiceService } from '../service/shared-data-service.service';
import { AuthService } from '../service/Auth.service';
@Component({
  selector: 'app-carte-creation',
  standalone: true,
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './carte-creation.component.html',
  styleUrl: './carte-creation.component.css'
})
export class CarteCreationComponent implements OnInit {
  portefeuille: any;
  carte: any;
  solde: any;
  devise:any;
  comptes: any;
  compte: any ;
  compte_solde: number=0;
  color: number = 1;
  carte_virt:any = {
    "numeroCarte": null,
    "dateExpiration": null ,
    "solde": null,
    "cvv": null,
    "statut": null,
    "devise": null,
    "portefeuille": null
};
isLoading: boolean = true;

  constructor(private carteVirtuelle: CarteVirtuelleService,private router: Router,private portefeuilleService : PortefeuilleService,private compteService: CompteService,private sharedDataService: SharedDataServiceService,private authService: AuthService) {}

  ngOnInit(): void {
    this.sharedDataService.setPortefeuilles(history.state.portefeuille);
    this.portefeuille = this.sharedDataService.getPortefeuilles();
    this.sharedDataService.setComptes(history.state.comptes);
    this.comptes = this.sharedDataService.getComptes();
    
    // forkJoin({
    //       comptes: this.compteService.getComptes(1)
    //     }).subscribe(
    //       ({comptes}) => {;
    //         this.comptes = comptes;
    //         this.isLoading = false; // Désactiver le chargement
    //         console.log('All data fetched:', {comptes });
    //       },
    //       (error) => {
    //         console.error('Error fetching data:', error);
    //         this.isLoading = false; 
    //       }
    //     );
  }

  creer(somme:number,devise:string,color:number): any {
    if (devise == "EUR") {
      this.devise = Devise.EUR;
    } else if (devise == "USD") {
      this.devise = Devise.USD;
    }
    else if (devise == "MAD") {
      this.devise = Devise.MAD;
    }
    console.log(somme,devise);
    this.carteVirtuelle.genererCarte(somme,devise,color).subscribe(
      (data) => {
        this.carte=data;
        console.log(this.carte)
        return data;
      }
    );
  }
  associer(carte: CarteVirtuelle): any {
    this.carte_virt["numeroCarte"] = carte.numeroCarte
    this.carte_virt["dateExpiration"] = carte.dateExpiration
    this.carte_virt["cvv"] = carte.cvv
    this.carte_virt["devise"] = carte.devise
    this.carte_virt["statut"] = carte.statut
    this.carte_virt["solde"]=carte.solde
    this.portefeuilleService.ajouterCarte(this.portefeuille.id,this.carte_virt).subscribe(
      (data) => {
        return data;
      }
    );
  }

  generer(somme:number,devise:Devise,id:number,color:number,compte: any): any {
   this.carteVirtuelle.creerCarte(somme,devise,id,color).subscribe(
    (data) => {
      console.log(data);
    }
   )
   this.carteVirtuelle.tauxDeChange(devise).subscribe(
    (data) => {
      this.compte_solde = Math.round(Number((somme * data[compte.devise]).toFixed(2)));
      console.log(this.compte_solde);
      this.compteService.retirerCompte(compte.id,this.compte_solde).subscribe(
        (data) => {
          console.log(data);
        }
      )
      this.portefeuilleService.retirer(this.portefeuille.id,this.compte_solde).subscribe(
        (data) => {
          console.log(data);
        }
      )
      this.router.navigateByUrl('/dashboard');

    }
    )
  }


  getCardClass(): string {
    const classes = ['blue', 'gray', 'gold'];
    if (this.color == 1) {
      return classes[0];
    } else if (this.color == 2) {
      return classes[1];
    }
    else if (this.color == 3) { 
      return classes[2];
    }
    return '';
  }
  goBack(): void {
    this.router.navigate(['/cart']); // Remplacez '/previous-page' par la route de la page précédente
  }

  logout() {
    console.log('Bouton Logout cliqué'); // Vérifiez que ce message s'affiche

    //Assurez-vous que logout() du service AuthService fonctionne bien
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
