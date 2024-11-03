import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurcharseOrdersComponent } from './purcharse-orders.component';

describe('PurcharseOrdersComponent', () => {
  let component: PurcharseOrdersComponent;
  let fixture: ComponentFixture<PurcharseOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurcharseOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurcharseOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
