import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrousesPageComponent } from './carrouses-page.component';

describe('CarrousesPageComponent', () => {
  let component: CarrousesPageComponent;
  let fixture: ComponentFixture<CarrousesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrousesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrousesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
