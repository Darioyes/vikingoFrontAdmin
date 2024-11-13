import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenancesListComponent } from './maintenances-list.component';

describe('MaintenancesListComponent', () => {
  let component: MaintenancesListComponent;
  let fixture: ComponentFixture<MaintenancesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenancesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenancesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
