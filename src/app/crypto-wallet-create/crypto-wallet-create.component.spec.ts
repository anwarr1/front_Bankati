import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoWalletCreateComponent } from './crypto-wallet-create.component';

describe('CryptoWalletCreateComponent', () => {
  let component: CryptoWalletCreateComponent;
  let fixture: ComponentFixture<CryptoWalletCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoWalletCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CryptoWalletCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
