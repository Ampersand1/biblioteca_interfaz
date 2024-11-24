import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Registro de usuario
  registrarUsuario(usuarioData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, usuarioData);
  }

  // Registro de admin
  registrarAdmin(adminData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signupadmin`, adminData);
  }

  // Login
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}
