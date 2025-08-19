import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesIndirectCostModifyComponent } from './categories-indirect-cost-modify.component';

describe('CategoriesIndirectCostModifyComponent', () => {
  let component: CategoriesIndirectCostModifyComponent;
  let fixture: ComponentFixture<CategoriesIndirectCostModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesIndirectCostModifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesIndirectCostModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
