import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroRequerimientosComponent } from './maestro-requerimientos.component';

describe('MaestroRequerimientosComponent', () => {
  let component: MaestroRequerimientosComponent;
  let fixture: ComponentFixture<MaestroRequerimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestroRequerimientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroRequerimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
