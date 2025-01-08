import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoWalletLoginComponent } from './crypto-wallet-login.component';

describe('CryptoWalletLoginComponent', () => {
  let component: CryptoWalletLoginComponent;
  let fixture: ComponentFixture<CryptoWalletLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoWalletLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CryptoWalletLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
