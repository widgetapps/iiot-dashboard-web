import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertgroupsEditComponent } from './alertgroups-edit.component';

describe('AlertgroupsEditComponent', () => {
  let component: AlertgroupsEditComponent;
  let fixture: ComponentFixture<AlertgroupsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertgroupsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertgroupsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
