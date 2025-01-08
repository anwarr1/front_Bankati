import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoWalletTradeComponent } from './crypto-wallet-trade.component';

describe('CryptoWalletTradeComponent', () => {
  let component: CryptoWalletTradeComponent;
  let fixture: ComponentFixture<CryptoWalletTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoWalletTradeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CryptoWalletTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
