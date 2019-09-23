import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReformatComponent } from './view-reformat.component';

describe('ViewReformatComponent', () => {
  let component: ViewReformatComponent;
  let fixture: ComponentFixture<ViewReformatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReformatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReformatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
