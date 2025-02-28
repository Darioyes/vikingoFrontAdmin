import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsDetailComponent } from './transactions-detail.component';

describe('TransactionsDetailComponent', () => {
  let component: TransactionsDetailComponent;
  let fixture: ComponentFixture<TransactionsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
