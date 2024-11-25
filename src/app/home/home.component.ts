import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../services/busqueda.service';  // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,  // Marca este componente como standalone
  imports: [CommonModule, FormsModule]  // Asegúrate de importar CommonModule
})
export class HomeComponent {

  mostrarAlerta: boolean = false;  // Variable para mostrar la alerta
  searchQuery: string = '';  // Almacena la consulta de búsqueda
  searchResults: any[] = [];  // Almacena los resultados de la búsqueda

  constructor(
    private router: Router,
    private searchService: SearchService  // Inyectamos el servicio de búsqueda
  ) {}

  // Método para manejar la búsqueda
  onSearch() {
    if (this.searchQuery.trim()) {
      this.searchService.searchBooks(this.searchQuery).subscribe(
        (data) => {
          this.searchResults = data;  // Guardamos los resultados de la búsqueda
        },
        (error) => {
          console.error('Error al realizar la búsqueda:', error);
          this.searchResults = [];  // Si hay error, vaciar los resultados
        }
      );
    } else {
      this.searchResults = [];  // Si no hay texto, vaciar resultados
    }
  }

  // Método para reservar un libro
  reservarLibro() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.mostrarAlerta = true;  // Muestra el mensaje si el usuario no está logueado
    } else {
      console.log('Libro reservado');
      // Aquí iría la lógica de la reserva del libro
    }
  }

  // Método para cerrar la alerta
  cerrarAlerta() {
    this.mostrarAlerta = false;  // Cierra el mensaje de alerta
  }
}
