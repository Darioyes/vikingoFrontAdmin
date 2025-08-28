import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDirectCostComponent } from './modify-direct-cost.component';

describe('ModifyDirectCostComponent', () => {
  let component: ModifyDirectCostComponent;
  let fixture: ComponentFixture<ModifyDirectCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyDirectCostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyDirectCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
