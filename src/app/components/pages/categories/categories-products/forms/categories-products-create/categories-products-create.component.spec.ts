import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesProductsCreateComponent } from './categories-products-create.component';

describe('CategoriesProductsCreateComponent', () => {
  let component: CategoriesProductsCreateComponent;
  let fixture: ComponentFixture<CategoriesProductsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesProductsCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesProductsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
