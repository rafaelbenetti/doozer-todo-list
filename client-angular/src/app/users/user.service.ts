import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  get(search?: string): Observable<User[]> {
    return this.http.get<User[]>(
      `http://localhost:3001/api/users${search ? `?search=${search}` : ''}`
    );
  }
}
