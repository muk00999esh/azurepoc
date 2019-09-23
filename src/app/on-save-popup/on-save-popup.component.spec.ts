import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnSavePopupComponent } from './on-save-popup.component';

describe('OnSavePopupComponent', () => {
  let component: OnSavePopupComponent;
  let fixture: ComponentFixture<OnSavePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnSavePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnSavePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
