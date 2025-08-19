import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesProductsModifyComponent } from './categories-products-modify.component';

describe('CategoriesProductsModifyComponent', () => {
  let component: CategoriesProductsModifyComponent;
  let fixture: ComponentFixture<CategoriesProductsModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesProductsModifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesProductsModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
