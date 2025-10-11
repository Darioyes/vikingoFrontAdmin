import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurcharseOrdersCreateComponent } from './purcharse-orders-create.component';

describe('PurcharseOrdersCreateComponent', () => {
  let component: PurcharseOrdersCreateComponent;
  let fixture: ComponentFixture<PurcharseOrdersCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurcharseOrdersCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurcharseOrdersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
