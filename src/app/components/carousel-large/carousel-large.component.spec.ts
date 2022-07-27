import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselLargeComponent } from './carousel-large.component';

describe('CarouselLargeComponent', () => {
  let component: CarouselLargeComponent;
  let fixture: ComponentFixture<CarouselLargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselLargeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
