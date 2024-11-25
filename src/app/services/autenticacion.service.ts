import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

interface UserInfo {
  id: string;
  usuario: string;
  correo: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) { }

  registrarUsuario(usuarioData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, usuarioData);
  }

  registrarAdmin(adminData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signupadmin`, adminData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  guardarToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      return null;
    }
  }

  getCurrentUser(): UserInfo | null {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    const decodedToken = this.decodeToken(token);
    if (!decodedToken) return null;

    return {
      id: decodedToken.id,
      usuario: decodedToken.usuario,
      correo: decodedToken.correo,
      rol: decodedToken.rol
    };
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.rol === 'admin';
  }

  logout(): void {
    localStorage.removeItem('accessToken'); 
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    if (!token) return false;

    try {
      const decodedToken = this.decodeToken(token);
      if (!decodedToken) return false;

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        this.logout();
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}