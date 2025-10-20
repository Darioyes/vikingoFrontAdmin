import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselInfoComponent } from './carousel-info.component';

describe('CarouselInfoComponent', () => {
  let component: CarouselInfoComponent;
  let fixture: ComponentFixture<CarouselInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
