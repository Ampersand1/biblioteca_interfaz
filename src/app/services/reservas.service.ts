import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:3000/api/reservas';

  constructor(private http: HttpClient) {}

  // 1. Crear una reserva
  crearReserva(token: any, inventarioId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${inventarioId}`, null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // 2. Eliminar una reserva
  eliminarReserva(token: any, reservaId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${reservaId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // 3. Ver todas las reservas (para el administrador)
  obtenerReservas(token: any): Observable<any> {
    return this.http.get(`${this.apiUrl}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // 4. Marcar una reserva como cumplida
  marcarCumplida(token: any, reservaId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${reservaId}/cumplida`, null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // 5. Ver reservas según el nombre del usuario (para el administrador)
  buscarReservasPorUsuario(token: any, nombreUsuario: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/${nombreUsuario}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  // 6. Obtener las reservas del usuario actual
  obtenerMisReservas(token: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/mis-reservas`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
