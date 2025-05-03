import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewSuppliersComponent } from './form-new-suppliers.component';

describe('FormNewSuppliersComponent', () => {
  let component: FormNewSuppliersComponent;
  let fixture: ComponentFixture<FormNewSuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNewSuppliersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNewSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
