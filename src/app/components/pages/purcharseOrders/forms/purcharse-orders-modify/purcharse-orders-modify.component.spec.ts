import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurcharseOrdersModifyComponent } from './purcharse-orders-modify.component';

describe('PurcharseOrdersModifyComponent', () => {
  let component: PurcharseOrdersModifyComponent;
  let fixture: ComponentFixture<PurcharseOrdersModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurcharseOrdersModifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurcharseOrdersModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
