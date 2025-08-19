import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesDirectCostCreateComponent } from './categories-direct-cost-create.component';

describe('CategoriesDirectCostCreateComponent', () => {
  let component: CategoriesDirectCostCreateComponent;
  let fixture: ComponentFixture<CategoriesDirectCostCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesDirectCostCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesDirectCostCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
