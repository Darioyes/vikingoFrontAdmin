import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceStatisticsComponent } from './maintenance-statistics.component';

describe('MaintenanceStatisticsComponent', () => {
  let component: MaintenanceStatisticsComponent;
  let fixture: ComponentFixture<MaintenanceStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
