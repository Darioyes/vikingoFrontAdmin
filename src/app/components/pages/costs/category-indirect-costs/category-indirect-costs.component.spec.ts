import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryIndirectCostsComponent } from './category-indirect-costs.component';

describe('CategoryIndirectCostsComponent', () => {
  let component: CategoryIndirectCostsComponent;
  let fixture: ComponentFixture<CategoryIndirectCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryIndirectCostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryIndirectCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
