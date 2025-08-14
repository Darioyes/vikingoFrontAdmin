import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesDirectCostsComponent } from './categories-direct-costs.component';

describe('CategoriesDirectCostsComponent', () => {
  let component: CategoriesDirectCostsComponent;
  let fixture: ComponentFixture<CategoriesDirectCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesDirectCostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesDirectCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
