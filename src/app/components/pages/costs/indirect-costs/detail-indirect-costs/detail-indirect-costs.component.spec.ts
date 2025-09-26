import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailIndirectCostsComponent } from './detail-indirect-costs.component';

describe('DetailIndirectCostsComponent', () => {
  let component: DetailIndirectCostsComponent;
  let fixture: ComponentFixture<DetailIndirectCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailIndirectCostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailIndirectCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
