import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserCaptureComponent } from './browser-capture.component';

describe('BrowserCaptureComponent', () => {
  let component: BrowserCaptureComponent;
  let fixture: ComponentFixture<BrowserCaptureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowserCaptureComponent]
    });
    fixture = TestBed.createComponent(BrowserCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
