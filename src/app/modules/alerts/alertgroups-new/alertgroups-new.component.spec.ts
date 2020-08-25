import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertgroupsNewComponent } from './alertgroups-new.component';

describe('AlertgroupsNewComponent', () => {
  let component: AlertgroupsNewComponent;
  let fixture: ComponentFixture<AlertgroupsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertgroupsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertgroupsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
