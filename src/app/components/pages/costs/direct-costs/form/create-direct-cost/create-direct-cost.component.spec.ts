import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDirectCostComponent } from './create-direct-cost.component';

describe('CreateDirectCostComponent', () => {
  let component: CreateDirectCostComponent;
  let fixture: ComponentFixture<CreateDirectCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDirectCostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDirectCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
