import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestroUsuarioComponent } from './maestro-usuario.component';

describe('MaestroUsuarioComponent', () => {
  let component: MaestroUsuarioComponent;
  let fixture: ComponentFixture<MaestroUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestroUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
