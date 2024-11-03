import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinerButtonComponent } from './spiner-button.component';

describe('SpinerButtonComponent', () => {
  let component: SpinerButtonComponent;
  let fixture: ComponentFixture<SpinerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinerButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
