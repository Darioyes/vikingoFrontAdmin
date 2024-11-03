import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectCostsComponent } from './direct-costs.component';

describe('DirectCostsComponent', () => {
  let component: DirectCostsComponent;
  let fixture: ComponentFixture<DirectCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectCostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
