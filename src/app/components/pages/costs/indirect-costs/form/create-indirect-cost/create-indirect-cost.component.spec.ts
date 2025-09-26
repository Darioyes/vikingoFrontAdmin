import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIndirectCostComponent } from './create-indirect-cost.component';

describe('CreateIndirectCostComponent', () => {
  let component: CreateIndirectCostComponent;
  let fixture: ComponentFixture<CreateIndirectCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateIndirectCostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateIndirectCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
