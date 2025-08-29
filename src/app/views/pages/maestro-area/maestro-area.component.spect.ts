import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MaestroAreaComponent } from "./maestro-area.component";

describe("MaestroAreaComponent", () => {
  let component: MaestroAreaComponent;
  let fixture: ComponentFixture<MaestroAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaestroAreaComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestroAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
