import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselNewComponent } from './carousel-new.component';

describe('CarouselNewComponent', () => {
  let component: CarouselNewComponent;
  let fixture: ComponentFixture<CarouselNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
