import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputLayoutstructureComponent } from './input-layoutstructure.component';

describe('InputLayoutstructureComponent', () => {
  let component: InputLayoutstructureComponent;
  let fixture: ComponentFixture<InputLayoutstructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputLayoutstructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputLayoutstructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
