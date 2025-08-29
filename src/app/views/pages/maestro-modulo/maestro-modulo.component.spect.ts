import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MaestroModuloComponent } from "./maestro-modulo.component";

describe("MaestroModuloComponent", () => {
  let component: MaestroModuloComponent;
  let fixture: ComponentFixture<MaestroModuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaestroModuloComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
