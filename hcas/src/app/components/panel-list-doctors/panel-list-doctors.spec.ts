import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelListDoctors } from './panel-list-doctors';

describe('PanelListDoctors', () => {
  let component: PanelListDoctors;
  let fixture: ComponentFixture<PanelListDoctors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelListDoctors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelListDoctors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
