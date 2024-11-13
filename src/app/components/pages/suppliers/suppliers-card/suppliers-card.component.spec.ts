import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersCardComponent } from './suppliers-card.component';

describe('SuppliersCardComponent', () => {
  let component: SuppliersCardComponent;
  let fixture: ComponentFixture<SuppliersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
