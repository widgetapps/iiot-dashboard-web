import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertgroupsComponent } from './alertgroups.component';

describe('AlertgroupsComponent', () => {
  let component: AlertgroupsComponent;
  let fixture: ComponentFixture<AlertgroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertgroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
