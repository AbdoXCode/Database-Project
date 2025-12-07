import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudentInfo } from './update-student-info';

describe('UpdateStudentInfo', () => {
  let component: UpdateStudentInfo;
  let fixture: ComponentFixture<UpdateStudentInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStudentInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStudentInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
