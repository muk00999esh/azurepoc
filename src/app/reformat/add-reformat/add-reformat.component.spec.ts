import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReformatComponent } from './add-reformat.component';

describe('AddReformatComponent', () => {
  let component: AddReformatComponent;
  let fixture: ComponentFixture<AddReformatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReformatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReformatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
