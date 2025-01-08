import { CreateClientComponent } from './create-client/create-client.component';
import { CreateAgentComponent } from './create-agent/create-agent.component';
import { TotaleComponent } from './totale/totale.component';
import { Login1Component } from './login1/login1.component';
import { Signup1Component } from './signup1/signup1.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TestComponent } from './test/test.component';
import { FactureComponent } from './facture/facture.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminComponent } from './admin/admin.component';
import { CreancierComponent } from './creancier/creancier.component';
import { Routes } from "@angular/router";
import { AuthGuard } from "./service/AuthGuard.service";
import { CreateClientGuard } from "./guards/create-client.guard";
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CarteCreationComponent } from './carte-creation/carte-creation.component';
import { CryptoWalletComponent } from './crypto-wallet/crypto-wallet.component';
import { CardFormComponent } from './card-form/card-form.component';
import { VirementComponent } from './virement/virement.component';
import { RechargeComponent } from './recharge/recharge.component';
import { VirementCryptoComponent } from './virement-crypto/virement-crypto.component';
import { CryptoWalletLoginComponent } from './crypto-wallet-login/crypto-wallet-login.component';
import { CryptoWalletCreateComponent } from './crypto-wallet-create/crypto-wallet-create.component';
import { CryptoWalletDashboardComponent } from './crypto-wallet-dashboard/crypto-wallet-dashboard.component';
import { CryptoWalletTradeComponent } from './crypto-wallet-trade/crypto-wallet-trade.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login1',
    pathMatch: 'full'
  },
  {
    path: 'signup1',
    component: Signup1Component
  },
  {
    path: 'client',
    component: CreateClientComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_AGENT', 'ROLE_ADMIN'] },
  },
  {
    path: 'agent',
    component: CreateAgentComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }  // Seuls les Admin peuvent accéder à create-agent
  },
  {
    path: 'total',
    component: TotaleComponent
  },
  {
    path: 'login1',
    component: Login1Component
  },
  {
    path: 'currency',
    component: CurrencyConverterComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CLIENT'] }  // Seuls les clients peuvent accéder à currency
  },
  {
    path: 'converter',
    component: CurrencyConverterComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CLIENT'] }  // Seuls les clients peuvent accéder à converter
  },
  {
    path: 'side-bar',
    component: SideBarComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'facture',
    component: FactureComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CLIENT'] }  // Seuls les clients peuvent accéder à facture
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CLIENT'] }  // Seuls les clients peuvent accéder au dashboard
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }  // Seuls les Admin peuvent accéder à admin
  },
  {
    path: 'creancier',
    component: CreancierComponent
  },
  { path: 'card-detail', component: CartDetailsComponent },
  {
    path: 'carteForm', component: CarteCreationComponent
  },
  {
    path: 'cryptoWallet', component: CryptoWalletComponent
  },
  {
    path: 'cryptoVirement', component: VirementCryptoComponent
  },
  { path: 'form', component: CardFormComponent },
  {
    path: 'virement',
    component: VirementComponent
  },
  {
    path: 'recharge',
    component: RechargeComponent
  },
  {
    path: 'crypto-wallet-login',
    component: CryptoWalletLoginComponent
  },
  {
    path: 'crypto-wallet-create',
    component: CryptoWalletCreateComponent
  },
  {
    path: 'crypto-wallet-dashboard',
    component: CryptoWalletDashboardComponent
  },
  {
    path: 'crypto-wallet-trade',
    component: CryptoWalletTradeComponent
  },
];
