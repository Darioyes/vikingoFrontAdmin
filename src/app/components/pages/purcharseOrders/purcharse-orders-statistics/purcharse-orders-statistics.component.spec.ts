import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurcharseOrdersStatisticsComponent } from './purcharse-orders-statistics.component';

describe('PurcharseOrdersStatisticsComponent', () => {
  let component: PurcharseOrdersStatisticsComponent;
  let fixture: ComponentFixture<PurcharseOrdersStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurcharseOrdersStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurcharseOrdersStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
