import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInformationProductComponent } from './form-information-product.component';

describe('FormInformationProductComponent', () => {
  let component: FormInformationProductComponent;
  let fixture: ComponentFixture<FormInformationProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInformationProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInformationProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
