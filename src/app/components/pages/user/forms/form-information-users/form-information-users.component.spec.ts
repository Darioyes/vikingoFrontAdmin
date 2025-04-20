import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInformationUsersComponent } from './form-information-users.component';

describe('FormInformationUsersComponent', () => {
  let component: FormInformationUsersComponent;
  let fixture: ComponentFixture<FormInformationUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInformationUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInformationUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
