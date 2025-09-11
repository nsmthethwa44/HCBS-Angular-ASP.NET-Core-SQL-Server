import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorStatsComponent } from './doctor-stats-component';

describe('DoctorStatsComponent', () => {
  let component: DoctorStatsComponent;
  let fixture: ComponentFixture<DoctorStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
