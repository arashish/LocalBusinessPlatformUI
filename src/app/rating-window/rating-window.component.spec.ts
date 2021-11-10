import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingWindowComponent } from './rating-window.component';

describe('RatingWindowComponent', () => {
  let component: RatingWindowComponent;
  let fixture: ComponentFixture<RatingWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
