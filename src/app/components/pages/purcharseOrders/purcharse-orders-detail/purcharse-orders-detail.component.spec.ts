import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurcharseOrdersDetailComponent } from './purcharse-orders-detail.component';

describe('PurcharseOrdersDetailComponent', () => {
  let component: PurcharseOrdersDetailComponent;
  let fixture: ComponentFixture<PurcharseOrdersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurcharseOrdersDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurcharseOrdersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
