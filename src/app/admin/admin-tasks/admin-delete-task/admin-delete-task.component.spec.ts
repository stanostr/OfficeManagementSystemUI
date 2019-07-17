import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteTaskComponent } from './admin-delete-task.component';

describe('AdminDeleteTaskComponent', () => {
  let component: AdminDeleteTaskComponent;
  let fixture: ComponentFixture<AdminDeleteTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDeleteTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeleteTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
