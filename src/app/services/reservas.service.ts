import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservasService {
  private apiUrl = 'http://localhost:3000/api/reservas'; // URL base de la API de reservas

  constructor(private http: HttpClient) {}

  /**
   * Obtener todas las reservas (solo para administradores).
   * Este endpoint devuelve una lista de todas las reservas con detalles.
   */
  getAllReservas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Marcar una reserva como cumplida (solo para administradores).
   * @param reservaId ID de la reserva a actualizar.
   */
  markReservaCumplida(reservaId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${reservaId}/cumplida`, {});
  }

  /**
   * Obtener reservas por nombre de usuario (solo para administradores).
   * @param nombreUsuario Nombre del usuario para buscar sus reservas.
   */
  getReservasByUsuario(nombreUsuario: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${nombreUsuario}`);
  }

  /**
   * Crear una reserva.
   * Este endpoint crea una nueva reserva para un libro específico.
   * @param inventarioId ID del libro que se desea reservar.
   */
  createReserva(inventarioId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${inventarioId}`, {});
  }

  /**
   * Obtener las reservas del usuario actual (autenticado).
   * Este endpoint devuelve las reservas del usuario basándose en su token.
   */
  getMisReservas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mis-reservas`);
  }

  /**
   * Eliminar una reserva por su ID.
   * @param reservaId ID de la reserva que se desea eliminar.
   */
  deleteReserva(reservaId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${reservaId}`);
  }

  // Confirmar la reserva
  confirmarReserva(inventarioId: string): Observable<any> {
    const token = localStorage.getItem('token');  // Obtener el token del usuario desde localStorage
    
    if (!token) {
      alert('No se encontró información de sesión. Por favor, inicia sesión.');
      throw new Error('No hay token de sesión.');
    }

    // Se incluye el token en el header Authorization como Bearer token
    const headers = { Authorization: `Bearer ${token}` };

    // Hacemos la solicitud POST para crear la reserva
    return this.http.post(`${this.apiUrl}/${inventarioId}`, {}, { headers });
  }
  obtenerReservas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mis-reservas`);
  }

  // Método para cancelar una reserva
  cancelarReserva(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/cancelar/${id}`);
  }
}
