import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresModuleComponent } from './proveedores-module.component';

describe('ProveedoresModuleComponent', () => {
  let component: ProveedoresModuleComponent;
  let fixture: ComponentFixture<ProveedoresModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedoresModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
