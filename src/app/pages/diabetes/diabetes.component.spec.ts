import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiabetesComponent } from './diabetes.component';

describe('DiabetesComponent', () => {
  let component: DiabetesComponent;
  let fixture: ComponentFixture<DiabetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiabetesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiabetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
