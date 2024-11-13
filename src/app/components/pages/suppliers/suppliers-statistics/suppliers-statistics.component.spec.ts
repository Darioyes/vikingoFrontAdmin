import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersStatisticsComponent } from './suppliers-statistics.component';

describe('SuppliersStatisticsComponent', () => {
  let component: SuppliersStatisticsComponent;
  let fixture: ComponentFixture<SuppliersStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliersStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
