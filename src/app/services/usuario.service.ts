import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  actualizarUsuario(token: any, datosUsuario: {
    usuario?: string;
    correo?: string;
    clave: string;
    nuevaClave?: string;
  }): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios`, datosUsuario, { // ACÁ TAMBIEN QUEDA ASI EL RETURN CON LOS HEADERS, Y ARRIBA EL METODO ENTRE LOS PARAMETROS SE MANDA EL TOKEN
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Cambiamos a 'Authorization' con el prefijo 'Bearer'
      }
    });
  }
  eliminarCuenta(token: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }
}