import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendanceReviewPage } from './attendance-review.page';

describe('AttendanceReviewPage', () => {
  let component: AttendanceReviewPage;
  let fixture: ComponentFixture<AttendanceReviewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AttendanceReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
