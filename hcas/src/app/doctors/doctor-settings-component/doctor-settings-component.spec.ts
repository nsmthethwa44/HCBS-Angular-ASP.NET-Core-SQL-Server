import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSettingsComponent } from './doctor-settings-component';

describe('DoctorSettingsComponent', () => {
  let component: DoctorSettingsComponent;
  let fixture: ComponentFixture<DoctorSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
