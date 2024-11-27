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
  agregarLibro(token: any, libro: any): Observable<any> { //parametros que deben estar son token y luego los del metodo como tal, que en este caso es el libro
    return this.http.post(`${this.apiUrl}`, libro, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Cambiamos a 'Authorization' con el prefijo 'Bearer', ASI DEBE QUEDAR EL RETURN EN LA PARTE DE HEADERS
      }
    });
  }

  obtenerLibrosAleatorios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/random`);
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
    return this.http.delete<any>(`http://localhost:3000/api/inventario/borrar/${id}`, { headers });
  }
  
  
  
  

}
