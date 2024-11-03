import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorydirectCostsComponent } from './categorydirect-costs.component';

describe('CategorydirectCostsComponent', () => {
  let component: CategorydirectCostsComponent;
  let fixture: ComponentFixture<CategorydirectCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorydirectCostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorydirectCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
