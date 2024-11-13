import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMaintenanceComponent } from './card-maintenance.component';

describe('CardMaintenanceComponent', () => {
  let component: CardMaintenanceComponent;
  let fixture: ComponentFixture<CardMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMaintenanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
