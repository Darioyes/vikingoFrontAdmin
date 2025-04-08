import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewMaintenanceComponent } from './form-new-maintenance.component';

describe('FormNewMaintenanceComponent', () => {
  let component: FormNewMaintenanceComponent;
  let fixture: ComponentFixture<FormNewMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNewMaintenanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNewMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
