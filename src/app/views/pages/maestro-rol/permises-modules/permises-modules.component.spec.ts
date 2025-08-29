import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisesModulesComponent } from './permises-modules.component';

describe('PermisesModulesComponent', () => {
  let component: PermisesModulesComponent;
  let fixture: ComponentFixture<PermisesModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisesModulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisesModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
