git commit -m "initial commit"import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudentService, Student } from '../../services/student';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-student-list',
  imports: [RouterLink],
  templateUrl: './student-list.html'
})
export class StudentListComponent implements OnInit {
  private studentService = inject(StudentService);

  students: Student[] = [];
  selectedStudent = '';
  loading = true;
  error = '';
  apiUrl = environment.apiUrl;

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.studentService.getStudents().subscribe({
      next: (data) => { this.students = data; this.loading = false; },
      error: (err) => { this.error = err.error?.message || 'Failed to load'; this.loading = false; }
    });
  }

  selectStudent(name: string) {
    this.selectedStudent = name;
  }

  deleteStudent(id: string) {
    if (!confirm('Delete this student?')) return;
    this.studentService.deleteStudent(id).subscribe({
      next: () => this.loadStudents(),
      error: (err) => alert(err.error?.message || 'Delete failed: maybe login required')
    });
  }

  uploadAvatar(id: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.studentService.uploadAvatar(id, file).subscribe({
      next: (res: any) => alert(`Uploaded: ${res.fileName} (${res.size} bytes) at ${res.url}`),
      error: (err) => alert(err.error?.message || 'Upload failed')
    });
  }
}
