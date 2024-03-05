import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleContactPage } from './single-contact.page';

describe('SingleContactPage', () => {
  let component: SingleContactPage;
  let fixture: ComponentFixture<SingleContactPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SingleContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
