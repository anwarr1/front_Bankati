import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoWalletDashboardComponent } from './crypto-wallet-dashboard.component';

describe('CryptoWalletDashboardComponent', () => {
  let component: CryptoWalletDashboardComponent;
  let fixture: ComponentFixture<CryptoWalletDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoWalletDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CryptoWalletDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
