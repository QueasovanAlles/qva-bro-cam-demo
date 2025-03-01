import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserVideoComponent } from './browser-video.component';

describe('BrowserVideoComponent', () => {
  let component: BrowserVideoComponent;
  let fixture: ComponentFixture<BrowserVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowserVideoComponent]
    });
    fixture = TestBed.createComponent(BrowserVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
