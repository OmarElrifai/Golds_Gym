import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesHistoryPage } from './sales-history.page';

describe('SalesHistoryPage', () => {
  let component: SalesHistoryPage;
  let fixture: ComponentFixture<SalesHistoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SalesHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
