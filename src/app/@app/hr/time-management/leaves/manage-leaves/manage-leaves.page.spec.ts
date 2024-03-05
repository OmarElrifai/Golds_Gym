import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageLeavesPage } from './manage-leaves.page';

describe('ManageLeavesPage', () => {
  let component: ManageLeavesPage;
  let fixture: ComponentFixture<ManageLeavesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ManageLeavesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
