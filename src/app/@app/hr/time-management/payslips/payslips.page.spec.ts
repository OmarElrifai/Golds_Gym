import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayslipsPage } from './payslips.page';

describe('PayslipsPage', () => {
  let component: PayslipsPage;
  let fixture: ComponentFixture<PayslipsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PayslipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
