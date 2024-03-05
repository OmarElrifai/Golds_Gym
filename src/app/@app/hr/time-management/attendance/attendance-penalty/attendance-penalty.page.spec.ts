import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendancePenaltyPage } from './attendance-penalty.page';

describe('AttendancePenaltyPage', () => {
  let component: AttendancePenaltyPage;
  let fixture: ComponentFixture<AttendancePenaltyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AttendancePenaltyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
