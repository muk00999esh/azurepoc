import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCarrierComponent } from './update-carrier.component';

describe('UpdateCarrierComponent', () => {
  let component: UpdateCarrierComponent;
  let fixture: ComponentFixture<UpdateCarrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCarrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
