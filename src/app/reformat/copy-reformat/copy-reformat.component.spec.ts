import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyReformatComponent } from './copy-reformat.component';

describe('CopyReformatComponent', () => {
  let component: CopyReformatComponent;
  let fixture: ComponentFixture<CopyReformatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyReformatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyReformatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
