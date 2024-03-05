import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarPage } from './toolbar.page';

describe('ToolbarPage', () => {
  let component: ToolbarPage;
  let fixture: ComponentFixture<ToolbarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ToolbarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
