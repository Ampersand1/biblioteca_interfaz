import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = 'http://localhost:3000/api/inventario/buscar';  // URL del backend

  constructor(private http: HttpClient) {}

  searchBooks(searchQuery: string): Observable<any> {
    const params = new HttpParams().set('query', searchQuery);  // Agregamos el parámetro 'query'
    return this.http.get<any[]>(this.apiUrl, { params });
  }
}
