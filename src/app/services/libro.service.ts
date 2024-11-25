import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private apiUrl = 'http://localhost:3000/api/inventario';  // Ajusta la URL de la API

  constructor(private http: HttpClient) { }

  // Método para obtener los libros
  obtenerLibros(): Observable<any[]> {
    const token = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Método para agregar un libro
  agregarLibro(libro: any): Observable<any> {
    const token = localStorage.getItem('access-token');  // Obtener el token desde el localStorage
    console.log('Token:', token);
    if (!token) {
      console.error('Token no disponible');
    }

    // Configurar los headers con el token de autenticación
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Realizar la solicitud POST para agregar el libro
    return this.http.post(this.apiUrl, libro, { headers });
  }


  // Método para actualizar un libro
  actualizarLibro(id: string, libro: any): Observable<any> {
    const token = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/${id}`, libro, { headers });
  }

  // Método para eliminar un libro
  eliminarLibro(id: string): Observable<any> {
    const token = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
}
