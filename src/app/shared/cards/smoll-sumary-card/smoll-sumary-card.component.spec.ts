import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmollSumaryCardComponent } from './smoll-sumary-card.component';

describe('SmollSumaryCardComponent', () => {
  let component: SmollSumaryCardComponent;
  let fixture: ComponentFixture<SmollSumaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmollSumaryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmollSumaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
