import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayStoreComponent } from './display-store.component';

describe('DisplayStoreComponent', () => {
  let component: DisplayStoreComponent;
  let fixture: ComponentFixture<DisplayStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
