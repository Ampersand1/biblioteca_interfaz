import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = 'http://localhost:3000/api/inventario'; // URL de tu API

  constructor(private http: HttpClient) {}

  // Método POST para agregar un nuevo libro
  agregarLibro(libro: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, libro); // Envía el libro al servidor
  }

  // Método PUT para actualizar un libro
  actualizarLibro(id: string, libro: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, libro); // Envía la actualización al servidor
  }

  // Método DELETE para eliminar un libro
  eliminarLibro(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/borrar/${id}`); // Envía la solicitud de eliminación al servidor
  }

  // Método GET para obtener los libros (esto podría ser útil para mostrar los libros en el inventario)
  obtenerLibros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Devuelve todos los libros
  }

}
