import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CFMappingComponent } from './cfmapping.component';

describe('CFMappingComponent', () => {
  let component: CFMappingComponent;
  let fixture: ComponentFixture<CFMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CFMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CFMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
