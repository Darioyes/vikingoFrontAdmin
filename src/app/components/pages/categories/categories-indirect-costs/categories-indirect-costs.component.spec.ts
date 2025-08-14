import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesIndirectCostsComponent } from './categories-indirect-costs.component';

describe('CategoriesIndirectCostsComponent', () => {
  let component: CategoriesIndirectCostsComponent;
  let fixture: ComponentFixture<CategoriesIndirectCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesIndirectCostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesIndirectCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
