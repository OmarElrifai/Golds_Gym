import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HrHomePage } from './hr-home.page';

describe('HrPage', () => {
  let component: HrHomePage;
  let fixture: ComponentFixture<HrHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HrHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
