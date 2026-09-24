import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student';

@Component({
  selector: 'app-student-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './student-form.html'
})
export class StudentFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEdit = false;
  editingId: string | null = null;
  submitting = false;
  error = '';
  success = '';

  studentForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    branch: ['', Validators.required]
  });

  ngOnInit() {
    this.editingId = this.route.snapshot.paramMap.get('id');
    if (this.editingId) {
      this.isEdit = true;
      this.studentService.getStudent(this.editingId).subscribe({
        next: (s) => this.studentForm.patchValue({ name: s.name, email: s.email, branch: s.branch }),
        error: () => this.error = 'Failed to load student'
      });
    }
  }

  submit() {
    this.error = '';
    this.success = '';
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }
    this.submitting = true;
    const data = this.studentForm.getRawValue();

    const req = this.isEdit
      ? this.studentService.updateStudent(this.editingId!, data)
      : this.studentService.addStudent(data);

    req.subscribe({
      next: () => {
        this.success = this.isEdit ? 'Updated successfully' : 'Created successfully';
        this.submitting = false;
        setTimeout(() => this.router.navigate(['/students']), 800);
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed (maybe login required). Use /login first.';
        this.submitting = false;
      }
    });
  }
}
