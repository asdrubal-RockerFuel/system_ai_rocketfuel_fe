import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MaestroOficinaComponent } from "./maestro-oficina.component";

describe("MaestroCategoryComponent", () => {
  let component: MaestroOficinaComponent;
  let fixture: ComponentFixture<MaestroOficinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaestroOficinaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroOficinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
