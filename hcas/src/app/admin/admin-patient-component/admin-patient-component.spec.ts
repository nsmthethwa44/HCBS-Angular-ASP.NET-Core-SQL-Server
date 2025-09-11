import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPatientComponent } from './admin-patient-component';

describe('AdminPatientComponent', () => {
  let component: AdminPatientComponent;
  let fixture: ComponentFixture<AdminPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPatientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
