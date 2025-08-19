import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesIndirectCostCreateComponent } from './categories-indirect-cost-create.component';

describe('CategoriesIndirectCostCreateComponent', () => {
  let component: CategoriesIndirectCostCreateComponent;
  let fixture: ComponentFixture<CategoriesIndirectCostCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesIndirectCostCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesIndirectCostCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
