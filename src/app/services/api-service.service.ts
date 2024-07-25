import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8060/api'; 

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, userData, { responseType: 'text'});
  }

  loginUser(email: string, password: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/auth/login`, { email, password }, { responseType: 'text'});
  } 
}
