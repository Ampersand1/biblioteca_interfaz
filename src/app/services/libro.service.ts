import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = 'http://localhost:3000/api/inventario';  // URL de tu API de libros

  constructor(private http: HttpClient) {}

  getLibros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  // Asegúrate de que la URL es correcta
  }
}
