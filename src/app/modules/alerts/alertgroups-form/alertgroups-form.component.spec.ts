import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertgroupsFormComponent } from './alertgroups-form.component';

describe('AlertgroupsFormComponent', () => {
  let component: AlertgroupsFormComponent;
  let fixture: ComponentFixture<AlertgroupsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertgroupsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertgroupsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
