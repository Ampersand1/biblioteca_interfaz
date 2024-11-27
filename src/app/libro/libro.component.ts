import { Component, Input, EventEmitter, Output } from '@angular/core';
import { LibroService } from '../services/libro.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-libro',
  standalone: true,
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LibroComponent {
  @Input() libro: any = {}; // Recibe un libro como objeto
  @Output() eliminar: EventEmitter<string> = new EventEmitter(); // Emite el ID del libro a eliminar
  @Output() actualizar: EventEmitter<any> = new EventEmitter(); // Emite el libro actualizado

  eliminando: boolean = false; // Controla la visibilidad del formulario de confirmación
  editando: boolean = false; // Controla si se está editando el libro
  libroOriginal: any = {}; // Guarda el estado original del libro para restaurarlo si es necesario

  constructor(private libroService: LibroService) {}

  // Método para iniciar el proceso de edición
  editarLibro(libroId: string) {
    this.libroService.obtenerLibroPorId(libroId).subscribe(
      response => {
        this.libro = response; // Rellenamos los campos del libro con los datos obtenidos
        this.editando = true; // Activamos el formulario de edición
      },
      error => {
        console.error('Error al obtener el libro:', error);
      }
    );
  }

  // Método para actualizar el libro
  actualizarLibro() {
    const token = localStorage.getItem('accessToken');
    this.libroService.actualizarLibro(token, this.libro._id, this.libro).subscribe(
      response => {
        console.log('Libro actualizado:', response);
        this.editando = false; // Finalizamos la edición
        window.location.reload();
      },
      error => {
        console.error('Error al actualizar el libro:', error);
        alert('Error al actualizar el libro: ' + (error.error?.message || error.message));
      }
    );
  }

  // Método para mostrar el formulario de edición
  mostrarFormularioEdicion() {
    this.editando = true; // Mostramos el formulario de edición
  }

  // Método para mostrar el formulario de eliminación
  mostrarFormularioEliminacion() {
    if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      this.eliminarLibro();
    }
  }

  // Método para eliminar el libro
  eliminarLibro() {
    this.eliminando = true; // Indicamos que estamos eliminando el libro
    const token = localStorage.getItem('accessToken');
    this.libroService.eliminarLibro(token, this.libro._id).subscribe(
      response => {
        console.log('Libro eliminado:', response);
        this.eliminando = false; // Finalizamos el proceso de eliminación
        window.location.reload();
      },
      error => {
        console.error('Error al eliminar el libro:', error);
        alert('Error al eliminar el libro: ' + (error.error?.message || error.message));
        this.eliminando = false;
      }
    );
  }

  cancelarEdicion() {
    this.editando = false; // Cancela la edición y oculta el formulario
  }
  cancelarEliminacion() {
    this.eliminando = false; // Cancela el proceso de eliminación
    console.log('Eliminación cancelada');
  }
}
