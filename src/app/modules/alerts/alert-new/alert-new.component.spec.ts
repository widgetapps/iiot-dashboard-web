import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertNewComponent } from './alert-new.component';

describe('AlertNewComponent', () => {
  let component: AlertNewComponent;
  let fixture: ComponentFixture<AlertNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
