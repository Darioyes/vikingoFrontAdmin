import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinerPagesComponent } from './spiner-pages.component';

describe('SpinerPagesComponent', () => {
  let component: SpinerPagesComponent;
  let fixture: ComponentFixture<SpinerPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinerPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinerPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
