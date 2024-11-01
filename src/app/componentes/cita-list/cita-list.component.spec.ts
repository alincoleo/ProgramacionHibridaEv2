import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CitaListComponent } from './cita-list.component';

describe('CitaListComponent', () => {
  let component: CitaListComponent;
  let fixture: ComponentFixture<CitaListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CitaListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CitaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
