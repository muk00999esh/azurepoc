import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyReformatComponent } from './modify-reformat.component';

describe('ModifyReformatComponent', () => {
  let component: ModifyReformatComponent;
  let fixture: ComponentFixture<ModifyReformatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyReformatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyReformatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
