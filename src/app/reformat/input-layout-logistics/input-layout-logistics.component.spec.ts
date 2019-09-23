import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLayoutLogisticsComponent } from './input-layout-logistics.component';

describe('InputLayoutLogisticsComponent', () => {
  let component: InputLayoutLogisticsComponent;
  let fixture: ComponentFixture<InputLayoutLogisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputLayoutLogisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputLayoutLogisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
