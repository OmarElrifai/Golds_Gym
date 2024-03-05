import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearningDevelopmentPage } from './learning-development.page';

describe('LearningDevelopmentPage', () => {
  let component: LearningDevelopmentPage;
  let fixture: ComponentFixture<LearningDevelopmentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LearningDevelopmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
