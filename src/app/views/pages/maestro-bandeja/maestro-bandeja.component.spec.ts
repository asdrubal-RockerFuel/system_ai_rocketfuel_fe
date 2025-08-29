import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroBandejaComponent } from './maestro-bandeja.component';

describe('MaestroBandejaComponent', () => {
  let component: MaestroBandejaComponent;
  let fixture: ComponentFixture<MaestroBandejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestroBandejaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroBandejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
