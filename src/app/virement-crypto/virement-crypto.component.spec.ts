import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirementCryptoComponent } from './virement-crypto.component';

describe('VirementCryptoComponent', () => {
  let component: VirementCryptoComponent;
  let fixture: ComponentFixture<VirementCryptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirementCryptoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VirementCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
