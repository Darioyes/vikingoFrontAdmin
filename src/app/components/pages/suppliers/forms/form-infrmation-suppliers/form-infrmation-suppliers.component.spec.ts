import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInfrmationSuppliersComponent } from './form-infrmation-suppliers.component';

describe('FormInfrmationSuppliersComponent', () => {
  let component: FormInfrmationSuppliersComponent;
  let fixture: ComponentFixture<FormInfrmationSuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInfrmationSuppliersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInfrmationSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
