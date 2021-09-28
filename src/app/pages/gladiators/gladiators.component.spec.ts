import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GladiatorsComponent } from './gladiators.component';

describe('GladiatorsComponent', () => {
  let component: GladiatorsComponent;
  let fixture: ComponentFixture<GladiatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GladiatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GladiatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
