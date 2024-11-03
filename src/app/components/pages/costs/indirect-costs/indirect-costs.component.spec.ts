import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndirectCostsComponent } from './indirect-costs.component';

describe('IndirectCostsComponent', () => {
  let component: IndirectCostsComponent;
  let fixture: ComponentFixture<IndirectCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndirectCostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndirectCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
