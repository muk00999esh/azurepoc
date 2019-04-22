import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCarrierComponent } from './view-carrier.component';

describe('ViewCarrierComponent', () => {
  let component: ViewCarrierComponent;
  let fixture: ComponentFixture<ViewCarrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCarrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
