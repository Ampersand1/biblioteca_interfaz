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

  // Muestra el formulario de modificación
  mostrarFormularioEdicion() {
    this.libroOriginal = { ...this.libro }; // Guarda el libro original antes de editar
    this.editando = true;
  }

  // Cancela la edición y restaura el estado original
  cancelarEdicion() {
    this.libro = { ...this.libroOriginal }; // Restaura el libro original
    this.editando = false;
  }

  // Ejecuta la actualización del libro
  actualizarLibro() {
    if (JSON.stringify(this.libro) === JSON.stringify(this.libroOriginal)) {
      alert('No se hicieron cambios en el libro.');
      return;
    }

    this.libroService.actualizarLibro(this.libro._id, this.libro).subscribe(
      response => {
        alert('Libro actualizado con éxito');
        this.actualizar.emit(this.libro); // Emite el libro actualizado al componente padre
        this.editando = false;
        window.location.reload();
      },
      error => {
        console.error('Error al actualizar el libro:', error);
        alert('Hubo un error al intentar actualizar el libro.');
      }
    );
  }

  // Muestra el formulario de confirmación para eliminar
  mostrarFormularioEliminacion() {
    this.eliminando = true;
  }

  // Cancela la eliminación
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
