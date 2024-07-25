import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsdfgComponent } from './asdfg.component';

describe('AsdfgComponent', () => {
  let component: AsdfgComponent;
  let fixture: ComponentFixture<AsdfgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsdfgComponent]
    });
    fixture = TestBed.createComponent(AsdfgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
