import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionsSchedualPage } from './sessions-schedual.page';

describe('SessionsSchedualPage', () => {
  let component: SessionsSchedualPage;
  let fixture: ComponentFixture<SessionsSchedualPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SessionsSchedualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
