import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MaestroProgramComponent } from "./maestro-programa.component";

describe("MaestroProgramComponent", () => {
  let component: MaestroProgramComponent;
  let fixture: ComponentFixture<MaestroProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaestroProgramComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
