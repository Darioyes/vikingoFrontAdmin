import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesDirectCostModifyComponent } from './categories-direct-cost-modify.component';

describe('CategoriesDirectCostModifyComponent', () => {
  let component: CategoriesDirectCostModifyComponent;
  let fixture: ComponentFixture<CategoriesDirectCostModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesDirectCostModifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesDirectCostModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
