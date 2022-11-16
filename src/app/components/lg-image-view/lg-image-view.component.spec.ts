import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LgImageViewComponent } from './lg-image-view.component';

describe('LgImageViewComponent', () => {
  let component: LgImageViewComponent;
  let fixture: ComponentFixture<LgImageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LgImageViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LgImageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
