import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroServiciosAdicionalesComponent } from './maestro-servicios-adicionales.component';

describe('MaestroServiciosAdicionalesComponent', () => {
  let component: MaestroServiciosAdicionalesComponent;
  let fixture: ComponentFixture<MaestroServiciosAdicionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestroServiciosAdicionalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroServiciosAdicionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
