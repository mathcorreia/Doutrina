import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSelectionComponent } from './signup-selection.component';

describe('SignupSelectionComponent', () => {
  let component: SignupSelectionComponent;
  let fixture: ComponentFixture<SignupSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
