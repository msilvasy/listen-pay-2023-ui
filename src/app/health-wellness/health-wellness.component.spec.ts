import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthWellnessComponent } from './health-wellness.component';

describe('HealthWellnessComponent', () => {
  let component: HealthWellnessComponent;
  let fixture: ComponentFixture<HealthWellnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthWellnessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthWellnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
