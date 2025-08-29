import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MaestroRolComponent } from "./maestro-rol.component";

describe("MaestroRolComponent", () => {
  let component: MaestroRolComponent;
  let fixture: ComponentFixture<MaestroRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaestroRolComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
