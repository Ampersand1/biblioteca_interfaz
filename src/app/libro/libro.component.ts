import { Component, Input, EventEmitter, Output } from '@angular/core';
import { LibroService } from '../services/libro.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-libro',
  standalone: true,
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css'],
  imports: [CommonModule]
})
export class LibroComponent {
  @Input() libro: any = {}; // Cambiado de array a un solo objeto
  @Output() eliminar: EventEmitter<string> = new EventEmitter(); // Emite el ID del libro a eliminar

  libroAEliminar: any = null; // Mantiene el libro que se está intentando eliminar
  showModal: boolean = false; // Controla la visibilidad del modal

  constructor(private libroService: LibroService) {}

  // Función para abrir el modal con el libro a eliminar
  confirmarEliminacion(libro: any) {
    this.libroAEliminar = libro;
    this.showModal = true; // Muestra el modal
  }

  // Función para cancelar la eliminación
  cancelarEliminacion() {
    this.showModal = false;
    this.libroAEliminar = null;
  }

  // Función para confirmar la eliminación
  eliminarLibro() {
    if (this.libroAEliminar && this.libroAEliminar._id) {
      this.libroService.eliminarLibro(this.libroAEliminar._id).subscribe(
        response => {
          console.log('Libro eliminado:', response);
          this.eliminar.emit(this.libroAEliminar._id); // Notifica al componente padre
          this.cancelarEliminacion(); // Cierra el modal
        },
        error => {
          console.error('Error al eliminar el libro:', error);
        }
      );
    } else {
      console.error('No se encontró el ID del libro para eliminar.');
    }
  }
  
}

