import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewUsersComponent } from './form-new-users.component';

describe('FormNewUsersComponent', () => {
  let component: FormNewUsersComponent;
  let fixture: ComponentFixture<FormNewUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNewUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
