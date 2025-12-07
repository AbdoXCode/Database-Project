import { Component, Inject, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { AuthServices } from '../../../../core/services/authServices/auth-services';
import { studentInfo } from '../../../../core/interface/authInterface';
import { isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Setting } from '../../../services/setting/setting';

@Component({
  selector: 'app-update-student-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-student-info.html',
  styleUrl: './update-student-info.css',
})
export class UpdateStudentInfo implements OnInit {
  settingService: Setting = inject(Setting);
  _AuthServices: AuthServices = inject(AuthServices);
  studentInfoSignal: WritableSignal<studentInfo | null> = signal(null);

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }


  updateForm: FormGroup = new FormGroup({
    First_Name: new FormControl(null, [Validators.required]),
    Last_Name: new FormControl(null, [Validators.required]),
    Email: new FormControl(null, [Validators.required, Validators.email]),
    Phone: new FormControl(null, [Validators.required]),
    Date_Of_Birth: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      const storedInfo = localStorage.getItem('studentInfo');
      if (storedInfo) {
        const info = JSON.parse(storedInfo);
        this.studentInfoSignal.set(info);

        this.updateForm.patchValue({
          First_Name: info.First_Name,
          Last_Name: info.Last_Name,
          Email: info.Email,
          Phone: info.Phone,
          Date_Of_Birth: info.Date_Of_Birth, 
        });

        console.log(this.studentInfoSignal());
      }
    }
  }

  updateStudentFormSubmit() {
    if (this.updateForm.valid) {
      const updatedInfo = this.updateForm.value;
      const studentId = this.studentInfoSignal()?.Student_ID;

      if (studentId) {
        console.log( updatedInfo);
        this.settingService.updateStudentInfo(updatedInfo, studentId).subscribe({
          next: (res) => {
            console.log( res);
          },
          error: (err) => {
            console.error('Update Failed:', err);
          }
        });
      }
    } 
  }
}