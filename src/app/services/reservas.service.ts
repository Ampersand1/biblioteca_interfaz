import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private apiUrl = 'http://localhost:3000/api/reservas';  // Cambia la URL si es necesario

  constructor(private http: HttpClient) { }

  // Método para obtener las reservas
  getReservas(): Observable<any> {
    const token = localStorage.getItem('access-token');  // O sessionStorage.getItem('access-token')
    
    if (!token) {
      throw new Error('Token no encontrado');
    }

    const headers = new HttpHeaders({
      'access-token': token  // Incluye el token en las cabeceras
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }
}
