import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockIconComponent } from './dock-icon.component';

describe('DockIconComponent', () => {
  let component: DockIconComponent;
  let fixture: ComponentFixture<DockIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DockIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DockIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
