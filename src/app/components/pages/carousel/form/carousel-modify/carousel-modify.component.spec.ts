import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselModifyComponent } from './carousel-modify.component';

describe('CarouselModifyComponent', () => {
  let component: CarouselModifyComponent;
  let fixture: ComponentFixture<CarouselModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselModifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
