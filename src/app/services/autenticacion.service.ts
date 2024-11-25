import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) { }

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

  // Guardar el token JWT en localStorage
  guardarToken(token: string): void {
    localStorage.setItem('access-token', token);
  }

  // Verificar si el usuario es admin a partir del token
  isAdmin(): boolean {
    const token = localStorage.getItem('access-token');
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken && decodedToken.rol === 'admin';  // Verifica si el rol es admin
    }
    return false;
  }

  // Decodificar el token JWT
  private decodeToken(token: string): any {
    const payload = token.split('.')[1]; // Decodificar el payload del JWT
    return JSON.parse(atob(payload));  // Decodifica el token y lo parsea
  }

  // Método para hacer logout y eliminar el token
  logout(): void {
    localStorage.removeItem('access-token');  // Elimina el token del localStorage
    this.router.navigate(['/login']);  // Redirige al login
  }
}
