import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaveToApprovePage } from './leave-to-approve.page';

describe('LeaveToApprovePage', () => {
  let component: LeaveToApprovePage;
  let fixture: ComponentFixture<LeaveToApprovePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LeaveToApprovePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
