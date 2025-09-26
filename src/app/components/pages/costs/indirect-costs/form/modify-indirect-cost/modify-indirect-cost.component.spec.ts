import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyIndirectCostComponent } from './modify-indirect-cost.component';

describe('ModifyIndirectCostComponent', () => {
  let component: ModifyIndirectCostComponent;
  let fixture: ComponentFixture<ModifyIndirectCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyIndirectCostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyIndirectCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
