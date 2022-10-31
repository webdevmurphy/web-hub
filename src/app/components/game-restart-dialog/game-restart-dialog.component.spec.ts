import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRestartDialogComponent } from './game-restart-dialog.component';

describe('GameRestartDialogComponent', () => {
  let component: GameRestartDialogComponent;
  let fixture: ComponentFixture<GameRestartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRestartDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameRestartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
