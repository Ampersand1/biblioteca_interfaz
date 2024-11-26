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
  @Input() libro: any = {}; // Recibe un libro como objeto
  @Output() eliminar: EventEmitter<string> = new EventEmitter(); // Emite el ID del libro a eliminar

  eliminando: boolean = false; // Controla la visibilidad del formulario de confirmación

  constructor(private libroService: LibroService) {}

  // Muestra el formulario de confirmación
  mostrarFormularioEliminacion() {
    this.eliminando = true;
  }

  // Oculta el formulario de confirmación
  cancelarEliminacion() {
    this.eliminando = false;
  }

  // Ejecuta la eliminación del libro
  eliminarLibro() {
    this.libroService.eliminarLibro(this.libro._id).subscribe(
      response => {
        alert('Libro eliminado con éxito');
        this.eliminar.emit(this.libro._id);
        this.eliminando = false;
        window.location.reload();
      },
      error => {
        console.error('Error al eliminar el libro:', error);
        alert('Hubo un error al intentar eliminar el libro. Verifique el token o el servidor.');
      }
    );
  }
  
}
