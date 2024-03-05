import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayslipDetailsPage } from './payslip-details.page';

describe('PayslipDetailsPage', () => {
  let component: PayslipDetailsPage;
  let fixture: ComponentFixture<PayslipDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PayslipDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
