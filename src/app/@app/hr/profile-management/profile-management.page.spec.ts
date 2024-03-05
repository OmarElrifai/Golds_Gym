import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileManagementPage } from './profile-management.page';

describe('ProfileManagementPage', () => {
  let component: ProfileManagementPage;
  let fixture: ComponentFixture<ProfileManagementPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfileManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
