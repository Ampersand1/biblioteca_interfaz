import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Importar CommonModule

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,  // Marca este componente como standalone
  imports: [CommonModule]  // Asegúrate de importar CommonModule
})
export class HomeComponent {

  mostrarAlerta: boolean = false;  // Variable para mostrar la alerta

  constructor(private router: Router) {}

  reservarLibro() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.mostrarAlerta = true;  // Muestra el mensaje si el usuario no está logueado
    } else {
      console.log('Libro reservado');
      // Aquí iría la lógica de la reserva del libro
    }
  }

  cerrarAlerta() {
    this.mostrarAlerta = false;  // Cierra el mensaje de alerta
  }
}
