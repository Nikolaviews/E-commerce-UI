import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestefComponent } from './testef.component';

describe('TestefComponent', () => {
  let component: TestefComponent;
  let fixture: ComponentFixture<TestefComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestefComponent]
    });
    fixture = TestBed.createComponent(TestefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
