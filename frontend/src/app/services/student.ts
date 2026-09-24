import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Student {
  _id?: string;
  name: string;
  email: string;
  branch: string;
}

@Injectable({ providedIn: 'root' })
export class StudentService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/students`;

  getStudents() {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudent(id: string) {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  addStudent(student: Student) {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(id: string, student: Partial<Student>) {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: string) {
    return this.http.delete<Student>(`${this.apiUrl}/${id}`);
  }

  uploadAvatar(id: string, file: File) {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post(`${this.apiUrl}/${id}/avatar`, fd);
  }
}
